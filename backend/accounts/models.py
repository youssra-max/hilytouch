from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class User(AbstractUser):
    """Custom user model using email as the primary identifier."""
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, default='')
    address = models.TextField(blank=True, default='')
    wilaya = models.CharField(max_length=100, blank=True, default='')
    is_partner = models.BooleanField(default=False, help_text='Désigne si l\'utilisateur est un vendeur/partenaire')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    class Meta:
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'

    def __str__(self):
        return self.email

    @property
    def loyalty_points(self):
        total = self.loyalty_transactions.aggregate(
            total=models.Sum('points')
        )['total']
        return total or 0


class SavedAddress(models.Model):
    """Saved delivery address for a user."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='saved_addresses'
    )
    label = models.CharField(
        max_length=50, default='Maison',
        help_text='Ex: Maison, Bureau, Famille'
    )
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    wilaya = models.CharField(max_length=100)
    commune = models.CharField(max_length=100, blank=True, default='')
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Adresse enregistrée'
        verbose_name_plural = 'Adresses enregistrées'
        ordering = ['-is_default', '-created_at']

    def __str__(self):
        return f'{self.label} — {self.full_name} ({self.wilaya})'

    def save(self, *args, **kwargs):
        # Ensure only one default address per user
        if self.is_default:
            SavedAddress.objects.filter(
                user=self.user, is_default=True
            ).exclude(pk=self.pk).update(is_default=False)
        super().save(*args, **kwargs)


class DiagnosticResult(models.Model):
    """Skin diagnostic results."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='diagnostics', null=True, blank=True
    )
    skin_type = models.CharField(max_length=50)
    concerns = models.JSONField(default=list)
    age_range = models.CharField(max_length=20)
    routine_level = models.CharField(max_length=20)
    recommended_products = models.JSONField(default=list)
    skin_summary = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Diagnostic peau'
        verbose_name_plural = 'Diagnostics peau'
        ordering = ['-created_at']

    def __str__(self):
        email = self.user.email if self.user else 'Anonyme'
        return f'Diagnostic {self.skin_type} — {email}'


class LoyaltyTransaction(models.Model):
    """Loyalty points transactions."""

    class Source(models.TextChoices):
        PURCHASE = 'purchase', 'Achat'
        REVIEW = 'review', 'Avis produit'
        SIGNUP = 'signup', 'Inscription'
        REFERRAL = 'referral', 'Parrainage'
        REDEMPTION = 'redemption', 'Utilisation'

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='loyalty_transactions'
    )
    points = models.IntegerField(
        help_text='Positif = gagné, négatif = utilisé'
    )
    source = models.CharField(max_length=20, choices=Source.choices)
    description = models.CharField(max_length=200, blank=True, default='')
    order = models.ForeignKey(
        'orders.Order', on_delete=models.SET_NULL,
        null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Transaction fidélité'
        verbose_name_plural = 'Transactions fidélité'
        ordering = ['-created_at']

    def __str__(self):
        sign = '+' if self.points > 0 else ''
        return f'{self.user.email}: {sign}{self.points} pts ({self.source})'
