from rest_framework import serializers
from .models import BlogPost


class BlogPostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for blog listing."""

    class Meta:
        model = BlogPost
        fields = [
            'id', 'slug', 'title', 'excerpt', 'image',
            'category', 'author', 'date', 'read_time',
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Full serializer for blog post detail."""

    class Meta:
        model = BlogPost
        fields = [
            'id', 'slug', 'title', 'excerpt', 'content', 'image',
            'category', 'author', 'date', 'read_time',
        ]
