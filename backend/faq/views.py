from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import FAQ, ContactMessage
from .serializers import FAQSerializer, ContactMessageSerializer


class FAQListView(generics.ListAPIView):
    """List all FAQs."""
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    filterset_fields = ['category']
    pagination_class = None


class ContactView(APIView):
    """Receive and save contact form submissions."""

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': 'Votre message a été envoyé avec succès. Nous vous répondrons sous 48h.',
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'error': 'Veuillez remplir tous les champs obligatoires.',
        }, status=status.HTTP_400_BAD_REQUEST)
