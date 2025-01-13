# Create your models here.
from django.db import models

from restaurant_category.models import Category
from user.models import User


class RestaurantRewievs:
    pass


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip = models.CharField(max_length=100)
    website = models.URLField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    opening_hours = models.CharField(max_length=100)
    price_level = models.CharField(max_length=100)
    image = models.ImageField(upload_to='restaurant_images/')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='restaurants')
    user = models.ForeignKey(to =User, on_delete=models.SET_NULL, null=True, related_name='restaurants')

    def __str__(self):
        return self.name
