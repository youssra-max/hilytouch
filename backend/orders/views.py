from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from products.models import Product
from .models import Cart, CartItem, Order, OrderItem, PromoCode, ShippingRate
from .serializers import (
    CartSerializer,
    AddToCartSerializer,
    UpdateCartItemSerializer,
    OrderSerializer,
    CreateOrderSerializer,
    PromoCodeSerializer,
    ValidatePromoSerializer,
    ShippingRateSerializer,
)


# ─── Cart Views ───────────────────────────────────────
class CartView(generics.RetrieveAPIView):
    """Get the current user's cart."""
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, _ = Cart.objects.prefetch_related(
            'items__product__category'
        ).get_or_create(user=self.request.user)
        return cart


class AddToCartView(APIView):
    """Add a product to the cart."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {'detail': 'Produit introuvable.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        if product.stock < quantity:
            return Response(
                {'detail': f'Stock insuffisant. Seulement {product.stock} disponible(s).'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, product=product,
            defaults={'quantity': quantity},
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        cart.refresh_from_db()
        return Response(
            CartSerializer(cart).data,
            status=status.HTTP_200_OK,
        )


class UpdateCartItemView(APIView):
    """Update the quantity of a cart item."""
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, item_id):
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            cart_item = CartItem.objects.get(
                id=item_id, cart__user=request.user
            )
        except CartItem.DoesNotExist:
            return Response(
                {'detail': 'Article introuvable dans le panier.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        cart_item.quantity = serializer.validated_data['quantity']
        cart_item.save()

        cart = Cart.objects.prefetch_related('items__product__category').get(
            user=request.user
        )
        return Response(CartSerializer(cart).data)


class RemoveCartItemView(APIView):
    """Remove an item from the cart."""
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, item_id):
        try:
            cart_item = CartItem.objects.get(
                id=item_id, cart__user=request.user
            )
        except CartItem.DoesNotExist:
            return Response(
                {'detail': 'Article introuvable dans le panier.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        cart_item.delete()

        cart = Cart.objects.prefetch_related('items__product__category').get(
            user=request.user
        )
        return Response(CartSerializer(cart).data)


# ─── Promo Code ───────────────────────────────────────
class ValidatePromoCodeView(APIView):
    """Validate and preview a promo code discount."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ValidatePromoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data['code'].upper().strip()
        order_total = serializer.validated_data['order_total']

        try:
            promo = PromoCode.objects.get(code=code)
        except PromoCode.DoesNotExist:
            return Response(
                {'valid': False, 'error': 'Code promo introuvable.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        if not promo.is_valid:
            return Response(
                {'valid': False, 'error': 'Ce code promo a expiré ou n\'est plus valide.'},
            )

        if order_total < promo.min_order:
            return Response({
                'valid': False,
                'error': f'Commande minimum de {promo.min_order:,} DA requise.'.replace(',', ' '),
            })

        discount = promo.calculate_discount(order_total)

        return Response({
            'valid': True,
            'code': promo.code,
            'description': promo.description,
            'discount_type': promo.discount_type,
            'discount_value': promo.discount_value,
            'discount_amount': discount,
            'new_total': order_total - discount,
        })


# ─── Shipping Rates ──────────────────────────────────
class ShippingRateListView(generics.ListAPIView):
    """List all shipping rates."""
    queryset = ShippingRate.objects.filter(is_available=True)
    serializer_class = ShippingRateSerializer
    pagination_class = None


class ShippingRateDetailView(APIView):
    """Get shipping rate for a specific wilaya."""

    def get(self, request, wilaya_code):
        try:
            rate = ShippingRate.objects.get(wilaya_code=wilaya_code)
        except ShippingRate.DoesNotExist:
            return Response(
                {'detail': 'Wilaya non trouvée.'},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(ShippingRateSerializer(rate).data)


# ─── Orders ──────────────────────────────────────────
class CreateOrderView(APIView):
    """Create an order from the current cart."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            cart = Cart.objects.prefetch_related('items__product').get(
                user=request.user
            )
        except Cart.DoesNotExist:
            return Response(
                {'detail': 'Votre panier est vide.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not cart.items.exists():
            return Response(
                {'detail': 'Votre panier est vide.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data
        promo_code_str = data.pop('promo_code', '')

        # Calculate shipping
        shipping_cost = 0
        try:
            rate = ShippingRate.objects.get(wilaya_name__iexact=data['wilaya'])
            shipping_cost = rate.standard_price
        except ShippingRate.DoesNotExist:
            shipping_cost = 500  # Default

        # Validate promo code
        promo = None
        discount = 0
        if promo_code_str:
            try:
                promo = PromoCode.objects.get(code=promo_code_str.upper().strip())
                if promo.is_valid:
                    discount = promo.calculate_discount(cart.total)
                    promo.times_used += 1
                    promo.save(update_fields=['times_used'])
            except PromoCode.DoesNotExist:
                pass

        # Calculate loyalty points (1 DA = 1 point)
        loyalty_points = cart.total // 100  # 1 point per 100 DA

        # Create the order
        order = Order.objects.create(
            user=request.user,
            total=cart.total,
            discount=discount,
            promo_code=promo,
            shipping_cost=shipping_cost,
            loyalty_points_earned=loyalty_points,
            shipping_address=data['shipping_address'],
            wilaya=data['wilaya'],
            phone=data['phone'],
            payment_method=data['payment_method'],
            notes=data.get('notes', ''),
        )

        # Create order items + reduce stock
        order_items = []
        for cart_item in cart.items.all():
            order_items.append(OrderItem(
                order=order,
                product=cart_item.product,
                product_title=cart_item.product.title,
                product_brand=cart_item.product.brand,
                quantity=cart_item.quantity,
                price=cart_item.product.price,
            ))
            # Reduce stock
            cart_item.product.stock = max(0, cart_item.product.stock - cart_item.quantity)
            cart_item.product.save(update_fields=['stock'])

        OrderItem.objects.bulk_create(order_items)

        # Award loyalty points
        from accounts.models import LoyaltyTransaction
        if loyalty_points > 0:
            LoyaltyTransaction.objects.create(
                user=request.user,
                points=loyalty_points,
                source='purchase',
                description=f'Commande {order.order_number}',
                order=order,
            )

        # Clear the cart
        cart.items.all().delete()

        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED,
        )


class OrderListView(generics.ListAPIView):
    """List the current user's orders."""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related('items')


class OrderDetailView(generics.RetrieveAPIView):
    """Get a single order by ID."""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related('items')


class TrackOrderView(APIView):
    """Track an order by order number and email (public)."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        order_number = request.data.get('order_number', '').strip()
        email = request.data.get('email', '').strip()

        if not order_number or not email:
            return Response(
                {'error': 'Veuillez remplir tous les champs.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            order = Order.objects.get(
                order_number=order_number,
                user__email=email,
            )
        except Order.DoesNotExist:
            return Response(
                {'error': 'Commande introuvable. Vérifiez vos informations.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        status_flow = [
            ('pending', 'Commande reçue'),
            ('confirmed', 'Commande confirmée'),
            ('shipped', 'En cours de livraison'),
            ('delivered', 'Livrée'),
        ]
        current_index = next(
            (i for i, (s, _) in enumerate(status_flow) if s == order.status), 0
        )

        steps = []
        for i, (s, label) in enumerate(status_flow):
            steps.append({
                'label': label,
                'completed': i <= current_index,
                'date': order.created_at.strftime('%d/%m/%Y') if i <= current_index else None,
            })

        return Response({
            'orderNumber': order.order_number,
            'status': order.get_status_display(),
            'estimatedDelivery': '2 à 4 jours ouvrés',
            'carrier': 'Yalidine Express',
            'trackingNumber': order.tracking_number or 'En attente',
            'steps': steps,
        })
