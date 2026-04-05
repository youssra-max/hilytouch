from django.urls import path
from . import views

urlpatterns = [
    path('faq/', views.FAQListView.as_view(), name='faq_list'),
    path('contact/', views.ContactView.as_view(), name='contact'),
]
