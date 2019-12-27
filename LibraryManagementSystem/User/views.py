from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework import viewsets
from rest_framework.utils import json

from .serializer import UserProfileSerializer, UserProfileEditSerializer
from .models import UserProfile
from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication
)


# def upload_user_profile_pic(request):
#
#     if request.method == 'POST':
#         name = request.POST.get('name', '')
#         mobile = int(request.POST.get('mobile', 0))
#         email = request.POST.get('email')
#         image_file = request.FILES['image']
#         try:
#             user_profile = UserProfile.objects.get(user__id=int(request.user))
#         except UserProfile.DoesNotExist:
#             user = User.objects.get(id=int(request.user))
#             user_profile = UserProfile.objects.create(user=user,
#                                                       name=name,
#                                                       mobile_number=mobile,
#                                                       email=email,
#                                                       display_pic=image_file)
#             return Response(status=status.HTTP_201_CREATED)


class UserProfileListAPIView(ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


class UserProfileViewSet(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileEditSerializer
    lookup_field = 'user'


class CustomObtainAuthToken(ObtainAuthToken):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})


class UserCreateAPIView(CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileEditSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        display_pic = request.FILES['display_pic']
        user = User.objects.get(id=int(request.data['user']))
        name = request.data['name']
        mobile_number = int(request.data['mobile_number'])
        email = request.data['email']
        image = UserProfile.objects.create(user=user,
                                           name=name,
                                           mobile_number=mobile_number,
                                           email=email,
                                           display_pic=display_pic)

        return HttpResponse(json.dumps({'message': "Uploaded"}), status=201)


class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = UserProfile.objects.all()
        serializer = UserProfileEditSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user_profile_serializer = UserProfileEditSerializer(data=request.data)
        if user_profile_serializer.is_valid():
            user_profile_serializer.save()
            return Response(user_profile_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', user_profile_serializer.errors)
            return Response(user_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

