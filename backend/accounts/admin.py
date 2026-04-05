from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, SavedAddress, DiagnosticResult, LoyaltyTransaction

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Informations supplémentaires', {'fields': ('phone', 'address', 'wilaya')}),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'wilaya', 'loyalty_points')
    search_fields = ('email', 'first_name', 'last_name', 'phone')

@admin.register(SavedAddress)
class SavedAddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'label', 'full_name', 'wilaya', 'is_default')
    list_filter = ('is_default', 'wilaya')
    search_fields = ('user__email', 'full_name', 'phone')

@admin.register(DiagnosticResult)
class DiagnosticResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'skin_type', 'age_range', 'created_at')
    list_filter = ('skin_type', 'routine_level', 'age_range')
    search_fields = ('user__email', 'skin_summary')

@admin.register(LoyaltyTransaction)
class LoyaltyTransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'source', 'created_at')
    list_filter = ('source',)
    search_fields = ('user__email', 'description')
