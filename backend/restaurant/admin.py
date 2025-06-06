# Register your models here.
from django.contrib import admin

from restaurant.models import Restaurant


class RestaurantAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['id', 'name']


admin.site.register(Restaurant, RestaurantAdmin)
