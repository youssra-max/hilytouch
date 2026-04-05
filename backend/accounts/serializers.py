from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import SavedAddress, DiagnosticResult, LoyaltyTransaction

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password': 'Les mots de passe ne correspondent pas.'}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        # Award signup loyalty points
        LoyaltyTransaction.objects.create(
            user=user, points=50, source='signup',
            description='Bonus d\'inscription'
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user profile."""
    loyalty_points = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'phone', 'address', 'wilaya', 'loyalty_points', 'date_joined',
        ]
        read_only_fields = ['id', 'email', 'date_joined', 'loyalty_points']


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for password change."""
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Mot de passe actuel incorrect.')
        return value


# ─── Saved Address ────────────────────────────────────
class SavedAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedAddress
        fields = [
            'id', 'label', 'full_name', 'phone',
            'address', 'wilaya', 'commune','is_default',
        ]


# ─── Diagnostic ──────────────────────────────────────
class DiagnosticInputSerializer(serializers.Serializer):
    skin_type = serializers.CharField()
    concerns = serializers.ListField(child=serializers.CharField())
    age = serializers.CharField()
    routine = serializers.CharField()


class DiagnosticResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosticResult
        fields = [
            'id', 'skin_type', 'concerns', 'age_range',
            'routine_level', 'recommended_products',
            'skin_summary', 'created_at',
        ]


# ─── Loyalty ─────────────────────────────────────────
class LoyaltyTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoyaltyTransaction
        fields = ['id', 'points', 'source', 'description', 'created_at']


# ─── Dashboard ───────────────────────────────────────
class DashboardSerializer(serializers.Serializer):
    total_orders = serializers.IntegerField()
    total_spent = serializers.IntegerField()
    loyalty_points = serializers.IntegerField()
    favorites_count = serializers.IntegerField()
    recent_orders = serializers.ListField()
