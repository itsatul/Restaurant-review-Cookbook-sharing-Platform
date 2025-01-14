from django.contrib.auth import get_user_model
from rest_framework import serializers

from restaurant.models import Restaurant
from restaurant_review.models import RestaurantReview

User = get_user_model()


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name']


class RestaurantReviewSerializer(serializers.ModelSerializer):
    liked_by = serializers.PrimaryKeyRelatedField(
        many=True,  # Because it's a ManyToManyField
        read_only=True  # Prevent users from modifying the liked_by field directly
    )
    restaurant = RestaurantSerializer(read_only=True)
    user = OwnerSerializer(read_only=True)

    class Meta:
        model = RestaurantReview
        fields = ['restaurant', 'user', 'text_content', 'rating', 'liked_by']
        read_only_fields = ['restaurant', 'user', 'liked_by']
