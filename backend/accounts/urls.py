from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Auth
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    
    # Dashboard & Loyalty
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
    path('loyalty/', views.LoyaltyTransactionsView.as_view(), name='loyalty'),
    
    # Addresses
    path('addresses/', views.SavedAddressListView.as_view(), name='address_list'),
    path('addresses/<int:pk>/', views.SavedAddressDetailView.as_view(), name='address_detail'),
    
    # Other
    path('diagnostic/', views.DiagnosticSubmitView.as_view(), name='diagnostic'),
]
