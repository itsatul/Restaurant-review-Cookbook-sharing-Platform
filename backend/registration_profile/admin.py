# Register your models here.
from django.contrib import admin

from registration_profile.models import RegistrationProfile


class RegistrationProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'code', 'user']


admin.site.register(RegistrationProfile, RegistrationProfileAdmin)
