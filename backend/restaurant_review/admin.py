# Register your models here.
from django.contrib import admin

from restaurant_review.models import RestaurantReview


class RestaurantReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'text_content']
    search_fields = ['text_content']


admin.site.register(RestaurantReview, RestaurantReviewAdmin)
