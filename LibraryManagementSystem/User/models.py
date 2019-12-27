from django.db import models
from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True)
    mobile_number = models.IntegerField(default=0)
    display_pic = models.ImageField(default='profile_image/default.jpg', upload_to='profile_image')
    email = models.EmailField()

    def __str__(self):
        return self.user.username

