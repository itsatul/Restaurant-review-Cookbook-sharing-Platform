# Create your models here.
from django.db import models
from django.db.models import Avg

from restaurant_category.models import Category
from user.models import User


class RestaurantRewievs:
    pass


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100, blank=True)
    street = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    zip = models.CharField(max_length=100, blank=True)
    website = models.URLField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, blank=True)
    opening_hours = models.CharField(max_length=100, blank=True)
    price_level = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='restaurant_images/', blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=False,
                                 related_name='restaurants', default=1)
    user = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True, blank=False, related_name='restaurants')

    @property
    def average_rating(self):
        # Aggregate the average rating from related reviews
        return self.restaurant_reviews.aggregate(avg_rating=Avg('rating'))['avg_rating'] or 0

    def __str__(self):
        return self.name
