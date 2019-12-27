from Borrow.models import Borrow
from Book.models import Book
from django.db.models import signals
from django.dispatch import receiver


@receiver(signals.post_save, sender=Borrow)
def stock_decrement(sender, instance, created, **kwargs):
    stock = instance.book.available_copy
    if created:
        if not instance.is_returned:
            obj = instance.book
            stock -= 1
            obj.available_copy = stock
            if stock <= 0:
                obj.availability = False
            obj.save()


@receiver(signals.pre_save, sender=Borrow)
def stock_increment(sender, instance, **kwargs):
    stock = instance.book.available_copy
    if instance.is_returned:
        stock += 1
        obj = instance.book
        obj.available_copy = stock
        if stock > 0:
            obj.availability = True
        obj.save()
