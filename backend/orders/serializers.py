from rest_framework import serializers
from .models import (
    Cart, CartItem, Order, OrderItem,
    PromoCode, ShippingRate,
)


# ─── Cart ─────────────────────────────────────────────
class CartItemSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)
    product_brand = serializers.CharField(source='product.brand', read_only=True)
    product_image = serializers.URLField(source='product.image', read_only=True)
    product_price = serializers.IntegerField(source='product.price', read_only=True)
    product_category = serializers.CharField(source='product.category.title', read_only=True)
    subtotal = serializers.IntegerField(read_only=True)

    class Meta:
        model = CartItem
        fields = [
            'id', 'product', 'product_title', 'product_brand',
            'product_image', 'product_price', 'product_category',
            'quantity', 'subtotal',
        ]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.IntegerField(read_only=True)
    items_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total', 'items_count']


class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1, min_value=1)


class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1)


# ─── Promo Code ───────────────────────────────────────
class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = [
            'code', 'description', 'discount_type', 'discount_value',
            'min_order', 'is_valid',
        ]


class ValidatePromoSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=50)
    order_total = serializers.IntegerField(min_value=0)


# ─── Shipping Rate ────────────────────────────────────
class ShippingRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingRate
        fields = [
            'wilaya_code', 'wilaya_name',
            'standard_price', 'express_price',
            'standard_days', 'express_days',
            'is_available',
        ]


# ─── Order Items ──────────────────────────────────────
class OrderItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.IntegerField(read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'product_title', 'product_brand',
            'quantity', 'price', 'subtotal',
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status_display = serializers.CharField(
        source='get_status_display', read_only=True
    )
    payment_display = serializers.CharField(
        source='get_payment_method_display', read_only=True
    )
    final_total = serializers.IntegerField(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'status_display',
            'total', 'discount', 'shipping_cost', 'final_total',
            'payment_method', 'payment_display',
            'shipping_address', 'wilaya', 'phone',
            'tracking_number', 'notes',
            'loyalty_points_earned',
            'items', 'created_at',
        ]


class CreateOrderSerializer(serializers.Serializer):
    shipping_address = serializers.CharField()
    wilaya = serializers.CharField()
    phone = serializers.CharField()
    payment_method = serializers.ChoiceField(
        choices=Order.PaymentMethod.choices, default='cod'
    )
    notes = serializers.CharField(required=False, default='')
    promo_code = serializers.CharField(required=False, default='')
