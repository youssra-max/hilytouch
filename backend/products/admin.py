from django.contrib import admin
from .models import Category, Product, ProductImage, ProductVariant, Review, Wishlist, RecentlyViewed

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'description')

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'brand', 'category', 'price', 'stock', 'is_new', 'is_featured', 'rating')
    list_filter = ('category', 'brand', 'is_new', 'is_featured')
    search_fields = ('title', 'brand', 'description')
    list_editable = ('price', 'stock', 'is_new', 'is_featured')
    inlines = [ProductImageInline, ProductVariantInline]
    readonly_fields = ('rating', 'reviews_count')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating', 'title', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('user__email', 'product__title', 'title', 'comment')

@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'created_at')
    search_fields = ('user__email', 'product__title')
    list_filter = ('created_at',)

@admin.register(RecentlyViewed)
class RecentlyViewedAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'viewed_at')
    search_fields = ('user__email', 'product__title')
