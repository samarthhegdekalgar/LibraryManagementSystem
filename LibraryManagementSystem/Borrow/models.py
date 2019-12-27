from django.db import models
from User.models import UserProfile
from Book.models import Book
from datetime import date, timedelta
from django.contrib.auth.models import User


class Borrow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrow_date = models.DateField(default=date.today())
    return_date = models.DateField(default=date.today() + timedelta(7))
    is_returned = models.BooleanField(default=False)

