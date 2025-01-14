# Create your models here.
from django.contrib.auth import get_user_model
from django.db import models

from restaurant_review.models import RestaurantReview

User = get_user_model()


class ReviewComment(models.Model):
    comment = models.TextField()
    date_created_comment = models.DateTimeField(auto_now_add=True)
    date_modified_comment = models.DateTimeField(auto_now=True)
    restaurant_review = models.ForeignKey(to=RestaurantReview, on_delete=models.CASCADE,
                                          related_name='comments_on_review')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='user_comments')

    def __str__(self):
        return self.comment
