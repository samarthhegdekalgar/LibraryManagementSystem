# Generated by Django 3.0 on 2019-12-18 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_userprofile_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
