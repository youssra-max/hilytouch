from rest_framework import generics
from .models import BlogPost
from .serializers import BlogPostListSerializer, BlogPostDetailSerializer


class BlogPostListView(generics.ListAPIView):
    """List all blog posts."""
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostListSerializer
    search_fields = ['title', 'excerpt', 'content']


class BlogPostDetailView(generics.RetrieveAPIView):
    """Get a blog post by slug."""
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'
