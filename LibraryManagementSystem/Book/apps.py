from django.apps import AppConfig


class BookConfig(AppConfig):
    name = 'Book'

    def ready(self):
        from . import signals