from django.db import models


class BlogPost(models.Model):
    """A blog article."""
    slug = models.SlugField(max_length=200, unique=True)
    title = models.CharField(max_length=300)
    excerpt = models.TextField(blank=True, default='')
    content = models.TextField()
    image = models.URLField(max_length=500, blank=True, default='')
    category = models.CharField(max_length=100, blank=True, default='')
    author = models.CharField(max_length=200, default='Équipe Hilytouch')
    date = models.DateField()
    read_time = models.CharField(max_length=20, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'
        ordering = ['-date']

    def __str__(self):
        return self.title
