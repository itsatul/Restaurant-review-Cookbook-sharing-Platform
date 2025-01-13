# Create your models here.
from django.contrib.auth import get_user_model
from django.db import models

from restaurant.models import Restaurant

User= get_user_model()
class RestaurantReview(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE, related_name='restaurant_reviews')
    user =models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='user_reviews')
    rating = models.PositiveIntegerField(choices=[(i,i) for i in range(1,6)]) #Rating 1-5
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    liked_by = models.ManyToManyField(to = User, related_name='liked_reviews')
    text_content = models.TextField()

    class Meta:
        unique_together = ('restaurant', 'user')

    def __str__(self):
        return f'Review by {self.user.username} on {self.restaurant.name}'


