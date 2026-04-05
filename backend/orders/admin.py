from django.contrib import admin
from .models import Cart, CartItem, Order, OrderItem, PromoCode, ShippingRate

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ('product', 'quantity')
    can_delete = False

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'items_count', 'total', 'updated_at')
    inlines = [CartItemInline]
    readonly_fields = ('user',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'product_title', 'product_brand', 'quantity', 'price')
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'status', 'final_total', 'payment_method', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('order_number', 'user__email', 'phone', 'tracking_number')
    list_editable = ('status',)
    readonly_fields = ('order_number', 'user', 'total', 'discount', 'shipping_cost', 'loyalty_points_earned')
    inlines = [OrderItemInline]
    fieldsets = (
        ('Informations Générales', {
            'fields': ('order_number', 'user', 'status', 'created_at', 'updated_at')
        }),
        ('Paiement & Montants', {
            'fields': ('total', 'discount', 'promo_code', 'shipping_cost', 'payment_method', 'loyalty_points_earned')
        }),
        ('Expédition', {
            'fields': ('shipping_address', 'wilaya', 'phone', 'tracking_number', 'notes')
        }),
    )
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + ('created_at', 'updated_at')
        return self.readonly_fields

@admin.register(PromoCode)
class PromoCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_type', 'discount_value', 'is_valid', 'times_used', 'max_uses')
    list_filter = ('discount_type', 'is_active')
    search_fields = ('code', 'description')

@admin.register(ShippingRate)
class ShippingRateAdmin(admin.ModelAdmin):
    list_display = ('wilaya_code', 'wilaya_name', 'standard_price', 'express_price', 'is_available')
    list_filter = ('is_available',)
    list_editable = ('standard_price', 'express_price', 'is_available')
    search_fields = ('wilaya_name', 'wilaya_code')
    ordering = ('wilaya_code',)
