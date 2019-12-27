from django.db import models


class Book(models.Model):
    name = models.CharField(max_length=150, verbose_name='Name')
    ISBN = models.IntegerField(verbose_name='ISBN')
    category = models.CharField(max_length=150)
    author = models.CharField(max_length=150, verbose_name='Author')
    total_copy = models.IntegerField(default=1)
    available_copy = models.IntegerField(default=1)
    availability = models.BooleanField(default=True)
    short_description = models.CharField(max_length=210)
    image = models.ImageField(default='book_image/default.jpg', upload_to='book_image')

    def __str__(self):
        return self.name

