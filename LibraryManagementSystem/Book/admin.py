from django.contrib import admin
from .models import Book


class BookAdmin(admin.ModelAdmin):
    list_display = ('name', 'ISBN', 'category', 'author',
                    'total_copy', 'available_copy', 'availability',
                    'short_description', 'image')


admin.site.register(Book, BookAdmin)
