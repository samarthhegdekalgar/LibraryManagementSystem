# Generated by Django 3.0 on 2019-12-19 05:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Book', '0003_auto_20191216_0728'),
        ('User', '0003_userprofile_name'),
        ('Borrow', '0002_auto_20191219_0352'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrow',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Book.Book'),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='User.UserProfile'),
        ),
    ]