# Create your models here.
from django.contrib.auth import get_user_model
from django.db import models

User =get_user_model()
class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="restaurants")


    def __str__(self):
        return self.name