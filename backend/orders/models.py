import uuid
from django.conf import settings
from django.db import models


class Cart(models.Model):
    """Shopping cart tied to a user."""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Panier'
        verbose_name_plural = 'Paniers'

    def __str__(self):
        return f'Panier de {self.user.email}'

    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())

    @property
    def items_count(self):
        return sum(item.quantity for item in self.items.all())


class CartItem(models.Model):
    """An item in a cart."""
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = 'Article du panier'
        verbose_name_plural = 'Articles du panier'
        unique_together = ('cart', 'product')

    def __str__(self):
        return f'{self.quantity}x {self.product.title}'

    @property
    def subtotal(self):
        return self.product.price * self.quantity


class PromoCode(models.Model):
    """Promotional discount code."""

    class DiscountType(models.TextChoices):
        PERCENTAGE = 'percentage', 'Pourcentage'
        FIXED = 'fixed', 'Montant fixe (DA)'

    code = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=200, blank=True, default='')
    discount_type = models.CharField(
        max_length=20, choices=DiscountType.choices, default=DiscountType.PERCENTAGE
    )
    discount_value = models.PositiveIntegerField(
        help_text='Valeur de la remise (% ou DA)'
    )
    min_order = models.PositiveIntegerField(
        default=0, help_text='Montant minimum de commande en DA'
    )
    max_uses = models.PositiveIntegerField(
        default=0, help_text='0 = illimité'
    )
    times_used = models.PositiveIntegerField(default=0)
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Code promo'
        verbose_name_plural = 'Codes promo'

    def __str__(self):
        return f'{self.code} ({self.discount_value}{"%" if self.discount_type == "percentage" else " DA"})'

    @property
    def is_valid(self):
        from django.utils import timezone
        now = timezone.now()
        if not self.is_active:
            return False
        if now < self.valid_from or now > self.valid_until:
            return False
        if self.max_uses > 0 and self.times_used >= self.max_uses:
            return False
        return True

    def calculate_discount(self, order_total):
        """Calculate the discount amount for a given order total."""
        if not self.is_valid:
            return 0
        if order_total < self.min_order:
            return 0
        if self.discount_type == self.DiscountType.PERCENTAGE:
            return round(order_total * self.discount_value / 100)
        return min(self.discount_value, order_total)


class ShippingRate(models.Model):
    """Shipping rates per wilaya."""
    wilaya_code = models.CharField(max_length=5, unique=True)
    wilaya_name = models.CharField(max_length=100)
    standard_price = models.PositiveIntegerField(
        help_text='Prix livraison standard en DA'
    )
    express_price = models.PositiveIntegerField(
        help_text='Prix livraison express en DA'
    )
    standard_days = models.CharField(
        max_length=20, default='3-5 jours',
        help_text='Délai livraison standard'
    )
    express_days = models.CharField(
        max_length=20, default='24-48h',
        help_text='Délai livraison express'
    )
    is_available = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Tarif de livraison'
        verbose_name_plural = 'Tarifs de livraison'
        ordering = ['wilaya_code']

    def __str__(self):
        return f'{self.wilaya_code} — {self.wilaya_name}'


class Order(models.Model):
    """A completed order."""

    class Status(models.TextChoices):
        PENDING = 'pending', 'En attente'
        CONFIRMED = 'confirmed', 'Confirmée'
        SHIPPED = 'shipped', 'Expédiée'
        DELIVERED = 'delivered', 'Livrée'
        CANCELLED = 'cancelled', 'Annulée'

    class PaymentMethod(models.TextChoices):
        COD = 'cod', 'Paiement à la livraison'
        CIB = 'cib', 'Carte CIB'
        EDAHABIA = 'edahabia', 'Edahabia'
        BARIDIMOB = 'baridimob', 'BaridiMob'

    order_number = models.CharField(max_length=20, unique=True, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders'
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )
    total = models.PositiveIntegerField(default=0)
    discount = models.PositiveIntegerField(default=0, help_text='Montant de la remise en DA')
    promo_code = models.ForeignKey(
        PromoCode, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='orders'
    )
    shipping_address = models.TextField()
    wilaya = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    payment_method = models.CharField(
        max_length=20, choices=PaymentMethod.choices, default=PaymentMethod.COD
    )
    shipping_cost = models.PositiveIntegerField(default=0)
    tracking_number = models.CharField(max_length=100, blank=True, default='')
    notes = models.TextField(blank=True, default='')
    loyalty_points_earned = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Commande'
        verbose_name_plural = 'Commandes'
        ordering = ['-created_at']

    def __str__(self):
        return f'Commande {self.order_number}'

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = f'HT-{uuid.uuid4().hex[:8].upper()}'
        super().save(*args, **kwargs)

    @property
    def final_total(self):
        return self.total - self.discount + self.shipping_cost


class OrderItem(models.Model):
    """An item in an order (snapshot at time of purchase)."""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(
        'products.Product', on_delete=models.SET_NULL, null=True
    )
    product_title = models.CharField(max_length=300)
    product_brand = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    price = models.PositiveIntegerField(help_text='Prix unitaire au moment de la commande')

    class Meta:
        verbose_name = "Article de commande"
        verbose_name_plural = "Articles de commande"

    def __str__(self):
        return f'{self.quantity}x {self.product_title}'

    @property
    def subtotal(self):
        return self.price * self.quantity
