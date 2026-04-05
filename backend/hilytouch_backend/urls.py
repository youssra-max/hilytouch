"""
Hily Touch Backend — Main URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def api_root(request):
    """API root — welcome endpoint."""
    return Response({
        'message': 'Bienvenue sur l\'API Hily Touch 🌸',
        'version': '1.0',
        'endpoints': {
            'products': '/api/products/',
            'categories': '/api/categories/',
            'blog': '/api/blog/',
            'faq': '/api/faq/',
            'auth': '/api/auth/',
            'cart': '/api/cart/',
            'orders': '/api/orders/',
        }
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api_root'),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('products.urls')),
    path('api/', include('orders.urls')),
    path('api/', include('blog.urls')),
    path('api/', include('faq.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Customize admin site
admin.site.site_header = 'Hily Touch — Administration'
admin.site.site_title = 'Hily Touch Admin'
admin.site.index_title = 'Gestion de la boutique'
