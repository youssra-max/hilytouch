from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import SavedAddress, DiagnosticResult, LoyaltyTransaction
from .serializers import (
    RegisterSerializer, UserSerializer, ChangePasswordSerializer,
    SavedAddressSerializer, DiagnosticInputSerializer,
    DiagnosticResultSerializer, LoyaltyTransactionSerializer,
)

User = get_user_model()


# ─── Auth ─────────────────────────────────────────────
class RegisterView(generics.CreateAPIView):
    """Register a new user and return JWT tokens."""
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class ProfileView(generics.RetrieveUpdateAPIView):
    """Get or update current user profile."""
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    """Change current user password."""
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.object.set_password(serializer.validated_data['new_password'])
            self.object.save()
            return Response(
                {'detail': 'Mot de passe modifié avec succès.'},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─── Addresses ────────────────────────────────────────
class SavedAddressListView(generics.ListCreateAPIView):
    """List or create saved addresses for the current user."""
    serializer_class = SavedAddressSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return SavedAddress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SavedAddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a saved address."""
    serializer_class = SavedAddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedAddress.objects.filter(user=self.request.user)


# ─── Diagnostic ───────────────────────────────────────
class DiagnosticSubmitView(APIView):
    """Submit a skin diagnostic quiz and get recommendations."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = DiagnosticInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        skin_type = data['skin_type']
        concerns = data['concerns']
        
        # Simple recommendation logic (can be expanded)
        summary = f"Votre peau est de type {skin_type}."
        if 'acne' in concerns or 'pores' in concerns:
            summary += " Elle a tendance aux imperfections."
        if 'rides' in concerns or 'eclat' in concerns:
            summary += " Elle a besoin de revitalisation et d'anti-âge."
            
        recommended = []
        from products.models import Product
        
        # Logic to find relevant products based on tags/categories
        # This is simplified; in production, you might match specific tags
        base_qs = Product.objects.all()
        if skin_type == 'seche':
            prods = base_qs.filter(title__icontains='Baume') | base_qs.filter(title__icontains='Huile')
            recommended.extend(list(prods[:2]))
        elif skin_type == 'grasse':
            prods = base_qs.filter(title__icontains='Nettoyant') | base_qs.filter(title__icontains='Sérum')
            recommended.extend(list(prods[:2]))
            
        # Fallback recommendations if empty
        if not recommended:
            recommended = list(base_qs[:3])
            
        rec_data = []
        for p in set(recommended):
            rec_data.append({
                'id': p.id,
                'title': p.title,
                'image': p.image,
                'reason': "Recommandé pour votre type de peau."
            })
            
        result = DiagnosticResult.objects.create(
            user=request.user if request.user.is_authenticated else None,
            skin_type=skin_type,
            concerns=concerns,
            age_range=data['age'],
            routine_level=data['routine'],
            skin_summary=summary,
            recommended_products=rec_data
        )
        
        # Add simple routine tips
        matin = ['Nettoyer avec un produit doux', 'Appliquer un sérum antioxydant', 'Hydrater et protéger (SPF)']
        soir = ['Démaquiller et nettoyer', 'Appliquer votre traitement cible', 'Nourrir avec une crème de nuit']
        
        res_data = DiagnosticResultSerializer(result).data
        res_data['routineTips'] = {'matin': matin, 'soir': soir}
        
        return Response(res_data, status=status.HTTP_201_CREATED)


# ─── Loyalty ─────────────────────────────────────────
class LoyaltyTransactionsView(generics.ListAPIView):
    """List loyal points transactions for the current user."""
    serializer_class = LoyaltyTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return LoyaltyTransaction.objects.filter(
            user=self.request.user
        ).order_by('-created_at')


# ─── Dashboard ───────────────────────────────────────
class DashboardView(APIView):
    """Aggregated data for user dashboard."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        from orders.models import Order
        from orders.serializers import OrderSerializer
        from products.models import Wishlist
        
        orders = Order.objects.filter(user=user)
        total_orders = orders.count()
        total_spent = sum(o.final_total for o in orders)
        recent_orders = orders.order_by('-created_at')[:3]
        
        favorites_count = Wishlist.objects.filter(user=user).count()
        
        return Response({
            'total_orders': total_orders,
            'total_spent': total_spent,
            'loyalty_points': user.loyalty_points,
            'favorites_count': favorites_count,
            'recent_orders': OrderSerializer(recent_orders, many=True).data,
        })
