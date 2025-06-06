# Generated by Django 5.1.4 on 2025-01-15 20:08

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('restaurant', '0004_alter_restaurant_city_alter_restaurant_country_and_more'),
        ('restaurant_category', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='category',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.SET_NULL,
                                    related_name='restaurants', to='restaurant_category.category'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='restaurants',
                                    to=settings.AUTH_USER_MODEL),
        ),
    ]
