from django.contrib.auth import get_user_model
from rest_framework import serializers

from restaurant.models import Restaurant
from restaurant_review.models import RestaurantReview

User = get_user_model()


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
        ref_name = 'Owner1'


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name']
        ref_name = 'Restaurant1'


class RestaurantReviewSerializer(serializers.ModelSerializer):
    liked_by = serializers.PrimaryKeyRelatedField(
        many=True,  # Because it's a ManyToManyField
        read_only=True  # Prevent users from modifying the liked_by field directly
    )
    like_count = serializers.SerializerMethodField()

    def get_like_count(self, obj):
        return len(obj.liked_by.all())

    comment_count = serializers.SerializerMethodField()

    def get_comment_count(self, obj):
        return len(obj.comments_on_review.all())

    restaurant = RestaurantSerializer(read_only=True)
    user = OwnerSerializer(read_only=True)

    class Meta:
        model = RestaurantReview
        fields = ['id', 'text_content', 'rating', 'liked_by', 'like_count', 'comment_count', 'restaurant', 'user', 'created_at']
        read_only_fields = ['id', 'restaurant', 'user', 'liked_by', 'like_count', 'comment_count', 'created_at']
        ref_name = "RestaurantReviewSerializer"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['liked_by'] = [
            user.username for user in instance.liked_by.all()
        ]
        if instance.created_at:
            representation['created_at'] = instance.created_at.strftime('%d.%m.%Y %H:%M')
        return representation
