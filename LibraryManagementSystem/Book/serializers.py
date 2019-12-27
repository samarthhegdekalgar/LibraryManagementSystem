from rest_framework import serializers

from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('pk', 'name', 'ISBN', 'category', 'author', 'total_copy',
                  'available_copy', 'availability', 'short_description', 'image',)
