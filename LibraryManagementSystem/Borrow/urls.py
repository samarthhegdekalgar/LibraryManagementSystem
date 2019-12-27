from django.urls import path
from .views import (
    BorrowListAPIView,
    BorrowCreateAPIView,
    BorrowSingleUserListAPIView,
    BorrowUpdateAPIView,
)

urlpatterns = [
    path('list/', BorrowListAPIView.as_view(), name='borrow-list'),
    path('create/', BorrowCreateAPIView.as_view(), name='borrow-create'),
    path('detail/<int:user>/', BorrowSingleUserListAPIView.as_view(), name='borrow-single-user'),
    path('update/<int:pk>/', BorrowUpdateAPIView.as_view(), name='return-book'),

]
