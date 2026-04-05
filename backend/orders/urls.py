from django.urls import path
from . import views

urlpatterns = [
    # Cart
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/add/', views.AddToCartView.as_view(), name='cart_add'),
    path('cart/update/<int:item_id>/', views.UpdateCartItemView.as_view(), name='cart_update'),
    path('cart/remove/<int:item_id>/', views.RemoveCartItemView.as_view(), name='cart_remove'),
    
    # Promo
    path('promo/validate/', views.ValidatePromoCodeView.as_view(), name='promo_validate'),
    
    # Shipping
    path('shipping-rates/', views.ShippingRateListView.as_view(), name='shipping_rates'),
    path('shipping-rates/<str:wilaya_code>/', views.ShippingRateDetailView.as_view(), name='shipping_rate_detail'),
    
    # Orders
    path('orders/', views.OrderListView.as_view(), name='order_list'),
    path('orders/create/', views.CreateOrderView.as_view(), name='order_create'),
    path('orders/<int:pk>/', views.OrderDetailView.as_view(), name='order_detail'),
    path('tracking/', views.TrackOrderView.as_view(), name='track_order'),
]
