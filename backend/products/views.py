from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import (
    Category, Product, Review, Wishlist, RecentlyViewed,
)
from .serializers import (
    CategorySerializer, CategoryDetailSerializer,
    ProductListSerializer, ProductDetailSerializer,
    ReviewSerializer, CreateReviewSerializer,
    WishlistSerializer, AddToWishlistSerializer,
    WishlistSerializer, AddToWishlistSerializer,
    RecentlyViewedSerializer, PartnerProductSerializer,
)


# ─── Permissions ──────────────────────────────────────
class IsPartner(permissions.BasePermission):
    """Checks if the user has the is_partner flag."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_partner)



# ─── Products ─────────────────────────────────────────
class ProductListView(generics.ListAPIView):
    """List all products with filtering, search, and ordering."""
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = {
        'category': ['exact'],
        'brand': ['exact'],
        'is_new': ['exact'],
        'is_featured': ['exact'],
        'price': ['gte', 'lte'],
    }
    search_fields = ['title', 'brand', 'description']
    ordering_fields = ['price', 'rating', 'created_at', 'title']
    ordering = ['-created_at']


class ProductDetailView(generics.RetrieveAPIView):
    """Retrieve a single product with images, variants, and reviews."""
    queryset = Product.objects.select_related('category').prefetch_related(
        'images', 'variants', 'reviews__user'
    )
    serializer_class = ProductDetailSerializer


# ─── Categories ───────────────────────────────────────
class CategoryListView(generics.ListAPIView):
    """List all categories."""
    queryset = Category.objects.prefetch_related('products').all()
    serializer_class = CategorySerializer
    pagination_class = None


class CategoryDetailView(generics.RetrieveAPIView):
    """Retrieve a category with its products."""
    queryset = Category.objects.prefetch_related('products__category').all()
    serializer_class = CategoryDetailSerializer
    lookup_field = 'slug'


# ─── Reviews ──────────────────────────────────────────
class ProductReviewsView(APIView):
    """List and create reviews for a product."""

    def get(self, request, product_id):
        reviews = Review.objects.filter(
            product_id=product_id
        ).select_related('user')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, product_id):
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Vous devez être connecté pour laisser un avis.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Check if user already reviewed this product
        if Review.objects.filter(product_id=product_id, user=request.user).exists():
            return Response(
                {'detail': 'Vous avez déjà laissé un avis pour ce produit.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = CreateReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {'detail': 'Produit introuvable.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        review = serializer.save(product=product, user=request.user)

        # Award loyalty points for review
        from accounts.models import LoyaltyTransaction
        LoyaltyTransaction.objects.create(
            user=request.user, points=10, source='review',
            description=f'Avis sur {product.title}'
        )

        return Response(
            ReviewSerializer(review).data,
            status=status.HTTP_201_CREATED,
        )


# ─── Wishlist ─────────────────────────────────────────
class WishlistView(generics.ListAPIView):
    """List user's wishlist items."""
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return Wishlist.objects.filter(
            user=self.request.user
        ).select_related('product__category')


class AddToWishlistView(APIView):
    """Add a product to wishlist."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = AddToWishlistSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data['product_id']
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {'detail': 'Produit introuvable.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        _, created = Wishlist.objects.get_or_create(
            user=request.user, product=product
        )

        if not created:
            return Response({'detail': 'Déjà dans vos favoris.'})

        return Response(
            {'detail': 'Ajouté aux favoris.'},
            status=status.HTTP_201_CREATED,
        )


class RemoveFromWishlistView(APIView):
    """Remove a product from wishlist."""
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, product_id):
        deleted, _ = Wishlist.objects.filter(
            user=request.user, product_id=product_id
        ).delete()

        if not deleted:
            return Response(
                {'detail': 'Produit non trouvé dans vos favoris.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response({'detail': 'Retiré des favoris.'})


# ─── Recently Viewed ─────────────────────────────────
class RecentlyViewedView(generics.ListAPIView):
    """Get user's recently viewed products."""
    serializer_class = RecentlyViewedSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return RecentlyViewed.objects.filter(
            user=self.request.user
        ).select_related('product__category')[:20]


class TrackProductView(APIView):
    """Track that a user viewed a product."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {'detail': 'Produit introuvable.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        RecentlyViewed.objects.update_or_create(
            user=request.user, product=product,
            defaults={}
        )

        # Keep only 30 most recent
        excess = RecentlyViewed.objects.filter(
            user=request.user
        ).order_by('-viewed_at')[30:]
        RecentlyViewed.objects.filter(id__in=excess.values('id')).delete()

        return Response({'detail': 'OK'})


# ─── Unified Search ──────────────────────────────────
class SearchView(APIView):
    """Search across products, categories, and blog posts."""

    def get(self, request):
        query = request.query_params.get('q', '').strip()
        if not query or len(query) < 2:
            return Response({
                'products': [], 'categories': [], 'blog': [],
            })

        # Search products
        products = Product.objects.filter(
            Q(title__icontains=query) |
            Q(brand__icontains=query) |
            Q(description__icontains=query)
        ).select_related('category')[:10]

        # Search categories
        categories = Category.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query)
        )[:5]

        # Search blog
        from blog.models import BlogPost
        blog_posts = BlogPost.objects.filter(
            Q(title__icontains=query) |
            Q(excerpt__icontains=query)
        )[:5]

        from blog.serializers import BlogPostListSerializer

        return Response({
            'products': ProductListSerializer(products, many=True).data,
            'categories': CategorySerializer(categories, many=True).data,
            'blog': BlogPostListSerializer(blog_posts, many=True).data,
        })
        return Response({
            'products': ProductListSerializer(products, many=True).data,
            'categories': CategorySerializer(categories, many=True).data,
            'blog': BlogPostListSerializer(blog_posts, many=True).data,
        })


# ─── Partner Dashboard API ─────────────────────────────
class PartnerProductListView(generics.ListCreateAPIView):
    """List or Create products for a specific partner."""
    serializer_class = PartnerProductSerializer
    permission_classes = [IsPartner]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user)


class PartnerProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Manage a specific products for a specific partner."""
    serializer_class = PartnerProductSerializer
    permission_classes = [IsPartner]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)
