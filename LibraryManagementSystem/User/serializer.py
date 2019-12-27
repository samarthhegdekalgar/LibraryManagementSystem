from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer
from .models import UserProfile


class UserSerializer(UserDetailsSerializer):
    mobile_number = serializers.IntegerField(source="UserProfile.mobile_number")
    display_pic = serializers.ImageField(source="UserProfile.display_pic")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('mobile_number', 'display_pic')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('UserProfile', {})
        mobile_number = profile_data.get('mobile_number')
        display_pic = profile_data.get('display_pic')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.UserProfile
        if profile_data and mobile_number and display_pic:
            profile.mobile_number = mobile_number
            profile.display_pic = display_pic
            profile.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.username')

    class Meta:
        model = UserProfile
        fields = ('pk', 'user', 'name', 'email', 'mobile_number', 'display_pic')


class UserProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('user', 'name', 'mobile_number', 'display_pic', 'email')
