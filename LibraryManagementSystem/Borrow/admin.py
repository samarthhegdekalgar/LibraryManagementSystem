from django.contrib import admin
from .models import Borrow


class BorrowAdmin(admin.ModelAdmin):
    list_display = ('user', 'book', 'borrow_date', 'return_date', 'is_returned')


admin.site.register(Borrow, BorrowAdmin)