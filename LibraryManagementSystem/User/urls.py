from django.urls import path
from .views import (
    UserProfileListAPIView,
    CustomObtainAuthToken,
    UserProfileViewSet,
    UserCreateAPIView,
    PostView,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', UserProfileViewSet, base_name='user')

urlpatterns = [
    path('list/', UserProfileListAPIView.as_view(), name='user-list'),
    path('id/', CustomObtainAuthToken.as_view(), name='user-id'),
    path('create/', PostView.as_view(), name='user-create'),

]
urlpatterns += router.urls
