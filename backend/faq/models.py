from django.db import models


class FAQ(models.Model):
    """Frequently asked question."""
    category = models.CharField(max_length=100)
    question = models.TextField()
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0, help_text='Ordre d\'affichage')

    class Meta:
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'
        ordering = ['category', 'order']

    def __str__(self):
        return self.question[:80]


class ContactMessage(models.Model):
    """A contact form submission."""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, default='')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Message de contact'
        verbose_name_plural = 'Messages de contact'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.subject or "Sans objet"}'
