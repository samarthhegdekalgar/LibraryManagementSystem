# Generated by Django 3.0 on 2019-12-19 03:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Borrow', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrow',
            name='borrow_date',
            field=models.DateField(default=datetime.date(2019, 12, 19)),
        ),
    ]
