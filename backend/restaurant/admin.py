# Register your models here.
from django.contrib import admin

from restaurant.models import Restaurant


class RestaurantAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

admin.site.register(Restaurant, RestaurantAdmin)
