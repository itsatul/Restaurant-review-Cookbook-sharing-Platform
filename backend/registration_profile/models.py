# Create your models here.
import random
import string

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


def code_generator(length=12):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


class RegistrationProfile(models.Model):
    code = models.CharField(max_length=12, default=code_generator)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)


@receiver(post_save, sender=User)
def create_registration_profile(sender, instance, **kwargs):
    RegistrationProfile.objects.get_or_create(user=instance)
