from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.response import Response

from .models import Borrow
from .serializers import BorrowEditSerializer, BorrowListSerializer


class BorrowListAPIView(ListAPIView):
    queryset = Borrow.objects.all()
    serializer_class = BorrowListSerializer


class BorrowCreateAPIView(CreateAPIView):
    queryset = Borrow.objects.all()
    serializer_class = BorrowEditSerializer


class BorrowSingleUserListAPIView(ListAPIView):
    serializer_class = BorrowListSerializer

    def get_queryset(self):
        return Borrow.objects.filter(user=self.kwargs['user'])


class BorrowUpdateAPIView(UpdateAPIView):
    queryset = Borrow.objects.all()
    serializer_class = BorrowListSerializer
    lookup_field = 'pk'

