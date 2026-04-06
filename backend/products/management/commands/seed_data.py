"""
Management command to seed the database from the frontend JSON data files.

Usage:
    python manage.py seed_data
"""
import json
from pathlib import Path
from django.core.management.base import BaseCommand
from products.models import Category, Product
from blog.models import BlogPost
from faq.models import FAQ


# Path to the frontend data directory
DATA_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent / 'src' / 'data'


class Command(BaseCommand):
    help = 'Seed the database with data from frontend JSON files'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before seeding',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write('Clearing existing data...')
            Product.objects.all().delete()
            Category.objects.all().delete()
            BlogPost.objects.all().delete()
            FAQ.objects.all().delete()

        self._seed_categories()
        self._seed_products()
        self._seed_blog()
        self._seed_faq()

        self.stdout.write(self.style.SUCCESS('\nDatabase seeded successfully!'))

    def _seed_categories(self):
        file_path = DATA_DIR / 'categories.json'
        if not file_path.exists():
            self.stdout.write(self.style.WARNING(f'Warning: {file_path} not found, skipping.'))
            return

        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        count = 0
        for item in data:
            _, created = Category.objects.update_or_create(
                slug=item['id'],
                defaults={
                    'title': item['title'],
                    'description': item.get('description', ''),
                    'image': item.get('image', ''),
                    'tags': item.get('tags', []),
                    'subcategories': item.get('subcategories', []),
                },
            )
            if created:
                count += 1

        self.stdout.write(f'Categories: {count} created, {len(data) - count} updated')

    def _seed_products(self):
        file_path = DATA_DIR / 'products.json'
        if not file_path.exists():
            self.stdout.write(self.style.WARNING(f'Warning: {file_path} not found, skipping.'))
            return

        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        count = 0
        for item in data:
            # Match category by type field (which is the slug)
            category_slug = item.get('type', '')
            try:
                category = Category.objects.get(slug=category_slug)
            except Category.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(f'  Warning: Category "{category_slug}" not found for product "{item["title"]}"')
                )
                continue

            _, created = Product.objects.update_or_create(
                id=item['id'],
                defaults={
                    'title': item['title'],
                    'brand': item.get('brand', ''),
                    'category': category,
                    'price': item['price'],
                    'image': item.get('image', ''),
                    'is_new': item.get('isNew', False),
                    'is_featured': item.get('isFeatured', False),
                    'rating': item.get('rating', 0),
                    'reviews_count': item.get('reviews', 0),
                    'description': item.get('description', ''),
                    'benefits': item.get('benefits', []),
                    'ingredients': item.get('ingredients', ''),
                    'usage': item.get('usage', ''),
                },
            )
            if created:
                count += 1

        self.stdout.write(f'Products: {count} created, {len(data) - count} updated')

    def _seed_blog(self):
        file_path = DATA_DIR / 'blog.json'
        if not file_path.exists():
            self.stdout.write(self.style.WARNING(f'Warning: {file_path} not found, skipping.'))
            return

        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        count = 0
        for item in data:
            _, created = BlogPost.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'title': item['title'],
                    'excerpt': item.get('excerpt', ''),
                    'content': item.get('content', ''),
                    'image': item.get('image', ''),
                    'category': item.get('category', ''),
                    'author': item.get('author', 'Équipe Hilytouch'),
                    'date': item['date'],
                    'read_time': item.get('readTime', ''),
                },
            )
            if created:
                count += 1

        self.stdout.write(f'Blog posts: {count} created, {len(data) - count} updated')

    def _seed_faq(self):
        file_path = DATA_DIR / 'faq.json'
        if not file_path.exists():
            self.stdout.write(self.style.WARNING(f'Warning: {file_path} not found, skipping.'))
            return

        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        count = 0
        for i, item in enumerate(data):
            _, created = FAQ.objects.update_or_create(
                id=item.get('id', i + 1),
                defaults={
                    'category': item['category'],
                    'question': item['question'],
                    'answer': item['answer'],
                    'order': i,
                },
            )
            if created:
                count += 1

        self.stdout.write(f'FAQs: {count} created, {len(data) - count} updated')
