from django.db import models
from django.conf import settings


class Category(models.Model):
    """Product category (e.g., Soins Visage, Maquillage)."""
    slug = models.SlugField(max_length=100, unique=True, primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, default='')
    image = models.URLField(max_length=500, blank=True, default='')
    tags = models.JSONField(default=list, blank=True)
    subcategories = models.JSONField(default=list, blank=True)

    class Meta:
        verbose_name = 'Catégorie'
        verbose_name_plural = 'Catégories'
        ordering = ['title']

    def __str__(self):
        return self.title


class Product(models.Model):
    """A beauty/cosmetic product."""
    title = models.CharField(max_length=300)
    brand = models.CharField(max_length=200)
    vendor = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='products_sold', help_text='Partner qui vend le produit'
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='products'
    )
    price = models.PositiveIntegerField(help_text='Prix en DA')
    old_price = models.PositiveIntegerField(
        null=True, blank=True, help_text='Ancien prix (barré) en DA'
    )
    stock = models.PositiveIntegerField(default=100, help_text='Quantité en stock')
    image = models.URLField(max_length=500, blank=True, default='')
    is_new = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    reviews_count = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True, default='')
    benefits = models.JSONField(default=list, blank=True)
    ingredients = models.TextField(blank=True, default='')
    usage = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Produit'
        verbose_name_plural = 'Produits'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.title} — {self.brand}'

    @property
    def price_formatted(self):
        return f'{self.price:,} DA'.replace(',', ' ')

    @property
    def old_price_formatted(self):
        if self.old_price:
            return f'{self.old_price:,} DA'.replace(',', ' ')
        return None

    @property
    def discount_percentage(self):
        if self.old_price and self.old_price > self.price:
            return round((1 - self.price / self.old_price) * 100)
        return 0

    @property
    def in_stock(self):
        return self.stock > 0

    def update_rating(self):
        """Recalculate rating from reviews."""
        from django.db.models import Avg
        agg = self.reviews.aggregate(avg=Avg('rating'))
        self.rating = round(agg['avg'] or 0, 1)
        self.reviews_count = self.reviews.count()
        self.save(update_fields=['rating', 'reviews_count'])


class ProductImage(models.Model):
    """Additional images for a product gallery."""
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='images'
    )
    image = models.URLField(max_length=500)
    alt_text = models.CharField(max_length=200, blank=True, default='')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Image produit'
        verbose_name_plural = 'Images produit'
        ordering = ['order']

    def __str__(self):
        return f'Image {self.order} — {self.product.title}'


class ProductVariant(models.Model):
    """Product variant (shade, size, color)."""

    class VariantType(models.TextChoices):
        COLOR = 'color', 'Couleur / Teinte'
        SIZE = 'size', 'Taille'
        SHADE = 'shade', 'Nuance'

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='variants'
    )
    variant_type = models.CharField(
        max_length=20, choices=VariantType.choices, default=VariantType.SHADE
    )
    name = models.CharField(max_length=100, help_text='Ex: Rose Poudré, 30ml')
    color_hex = models.CharField(
        max_length=7, blank=True, default='',
        help_text='Code couleur hex (ex: #E8A0BF)'
    )
    price_adjustment = models.IntegerField(
        default=0, help_text='Ajustement de prix (+ ou -) en DA'
    )
    stock = models.PositiveIntegerField(default=50)
    is_available = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Variante'
        verbose_name_plural = 'Variantes'

    def __str__(self):
        return f'{self.product.title} — {self.name}'


class Review(models.Model):
    """Product review by a user."""
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='reviews'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews'
    )
    rating = models.PositiveSmallIntegerField(
        help_text='Note de 1 à 5'
    )
    title = models.CharField(max_length=200, blank=True, default='')
    comment = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Avis'
        verbose_name_plural = 'Avis'
        unique_together = ('product', 'user')
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.email} → {self.product.title} ({self.rating}★)'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.product.update_rating()


class Wishlist(models.Model):
    """User's favourite products."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='wishlist'
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='wishlisted_by'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Favori'
        verbose_name_plural = 'Favoris'
        unique_together = ('user', 'product')
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.email} ♥ {self.product.title}'


class RecentlyViewed(models.Model):
    """Track recently viewed products per user."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='recently_viewed'
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE
    )
    viewed_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Vu récemment'
        verbose_name_plural = 'Vus récemment'
        unique_together = ('user', 'product')
        ordering = ['-viewed_at']

    def __str__(self):
        return f'{self.user.email} → {self.product.title}'
