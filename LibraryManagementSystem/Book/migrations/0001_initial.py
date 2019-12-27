# Generated by Django 3.0 on 2019-12-16 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Name')),
                ('ISBN', models.IntegerField(verbose_name='ISBN')),
                ('category', models.CharField(max_length=150)),
                ('author', models.CharField(max_length=150, verbose_name='Author')),
                ('total_copy', models.IntegerField(default=1)),
                ('available_copy', models.IntegerField(default=1)),
                ('availability', models.BooleanField(default=True)),
                ('short_description', models.TextField()),
            ],
        ),
    ]