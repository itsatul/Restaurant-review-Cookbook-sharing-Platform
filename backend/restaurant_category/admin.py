from django.contrib import admin

from restaurant_category.models import Category


class RestaurantCategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


admin.site.register(Category, RestaurantCategoryAdmin)