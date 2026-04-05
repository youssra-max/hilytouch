from django.urls import path
from . import views

urlpatterns = [
    # Search
    path('search/', views.SearchView.as_view(), name='search'),

    # Categories
    path('categories/', views.CategoryListView.as_view(), name='category_list'),
    path('categories/<slug:slug>/', views.CategoryDetailView.as_view(), name='category_detail'),

    # Products
    path('products/', views.ProductListView.as_view(), name='product_list'),
    path('products/recently-viewed/', views.RecentlyViewedView.as_view(), name='recently_viewed'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product_detail'),
    path('products/<int:product_id>/track/', views.TrackProductView.as_view(), name='product_track'),
    path('products/<int:product_id>/reviews/', views.ProductReviewsView.as_view(), name='product_reviews'),

    # Wishlist
    path('wishlist/', views.WishlistView.as_view(), name='wishlist_list'),
    path('wishlist/add/', views.AddToWishlistView.as_view(), name='wishlist_add'),
    path('wishlist/remove/<int:product_id>/', views.RemoveFromWishlistView.as_view(), name='wishlist_remove'),

    # Partner Portal
    path('partner/products/', views.PartnerProductListView.as_view(), name='partner_product_list'),
    path('partner/products/<int:pk>/', views.PartnerProductDetailView.as_view(), name='partner_product_detail'),
]
