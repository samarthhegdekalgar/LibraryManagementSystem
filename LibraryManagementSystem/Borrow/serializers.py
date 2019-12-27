from rest_framework import serializers
from .models import Borrow


class BorrowEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = ('user', 'book', 'borrow_date', 'return_date', 'is_returned')


class BorrowListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = ('pk', 'user', 'book', 'borrow_date', 'return_date', 'is_returned')
