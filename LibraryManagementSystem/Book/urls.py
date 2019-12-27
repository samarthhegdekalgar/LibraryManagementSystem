from django.urls import path

from .views import BookListAPIView, BookRetrieveAPIView

urlpatterns = [
    path('list/', BookListAPIView.as_view(), name='book-list'),
    path('detail/<int:pk>/', BookRetrieveAPIView.as_view(), name='book-detail'),
]
