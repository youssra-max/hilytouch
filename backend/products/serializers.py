from rest_framework import serializers
from .models import (
    Category, Product, ProductImage, ProductVariant,
    Review, Wishlist, RecentlyViewed,
)


# ─── Product Images ───────────────────────────────────
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'order']


# ─── Product Variants ─────────────────────────────────
class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = [
            'id', 'variant_type', 'name', 'color_hex',
            'price_adjustment', 'stock', 'is_available',
        ]


# ─── Reviews ──────────────────────────────────────────
class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            'id', 'user_name', 'rating', 'title',
            'comment', 'created_at',
        ]

    def get_user_name(self, obj):
        return f'{obj.user.first_name} {obj.user.last_name[0]}.' if obj.user.last_name else obj.user.first_name or 'Client'


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['rating', 'title', 'comment']

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError('La note doit être entre 1 et 5.')
        return value


# ─── Category ─────────────────────────────────────────
class CategorySerializer(serializers.ModelSerializer):
    products_count = serializers.IntegerField(
        source='products.count', read_only=True
    )

    class Meta:
        model = Category
        fields = [
            'slug', 'title', 'description', 'image',
            'tags', 'subcategories', 'products_count',
        ]


# ─── Product ──────────────────────────────────────────
class ProductListSerializer(serializers.ModelSerializer):
    category_id = serializers.CharField(source='category.slug')
    category_title = serializers.CharField(source='category.title')
    price_formatted = serializers.CharField(read_only=True)
    old_price_formatted = serializers.CharField(read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)
    in_stock = serializers.BooleanField(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'brand', 'category_id', 'category_title',
            'price', 'old_price', 'price_formatted', 'old_price_formatted',
            'discount_percentage', 'stock', 'in_stock',
            'image', 'is_new', 'is_featured',
            'rating', 'reviews_count',
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    category_id = serializers.CharField(source='category.slug')
    category_title = serializers.CharField(source='category.title')
    price_formatted = serializers.CharField(read_only=True)
    old_price_formatted = serializers.CharField(read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)
    in_stock = serializers.BooleanField(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    recent_reviews = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'brand', 'category_id', 'category_title',
            'price', 'old_price', 'price_formatted', 'old_price_formatted',
            'discount_percentage', 'stock', 'in_stock',
            'image', 'images', 'variants',
            'is_new', 'is_featured',
            'rating', 'reviews_count',
            'description', 'benefits', 'ingredients', 'usage',
            'recent_reviews',
            'created_at',
        ]

    def get_recent_reviews(self, obj):
        reviews = obj.reviews.select_related('user')[:5]
        return ReviewSerializer(reviews, many=True).data


# ─── Category Detail ──────────────────────────────────
class CategoryDetailSerializer(serializers.ModelSerializer):
    products = ProductListSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = [
            'slug', 'title', 'description', 'image',
            'tags', 'subcategories', 'products',
        ]


# ─── Wishlist ─────────────────────────────────────────
class WishlistSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'created_at']


class AddToWishlistSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()


# ─── Recently Viewed ─────────────────────────────────
class RecentlyViewedSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)

    class Meta:
        model = RecentlyViewed
        fields = ['product', 'viewed_at']

# ─── Partner / Marketplace ────────────────────────────
class PartnerProductSerializer(serializers.ModelSerializer):
    category_id = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        source='category',
        slug_field='slug',
        write_only=True
    )
    category_title = serializers.CharField(source='category.title', read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'brand', 'category_id', 'category_title',
            'price', 'old_price', 'stock', 'image', 'images', 'variants',
            'description', 'benefits', 'ingredients', 'usage',
            'is_new', 'is_featured', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']
