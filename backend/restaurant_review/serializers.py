from collections import OrderedDict

from django.contrib.auth import get_user_model
from rest_framework import serializers

from restaurant.models import Restaurant
from restaurant_review.models import RestaurantReview

User = get_user_model()


class OwnerSerializer(serializers.ModelSerializer):
    review_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    def get_review_count(self, obj):
        return obj.user_reviews.count()

    def get_comment_count(self, obj):
        return obj.user_comments.count()
    class Meta:
        model = User
        fields = ['id', 'username', 'review_count', 'comment_count', 'profile_picture']
        ref_name = 'Owner1'


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'description', 'image']
        ref_name = 'Restaurant1'


class RestaurantReviewSerializer(serializers.ModelSerializer):
    liked_by = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    # review_count = serializers.SerializerMethodField()


    # def get_review_count(self, obj):
    #     return len(obj.user_reviews.all())
    def get_liked_by(self, obj):
        return [user.username for user in obj.liked_by.all()]
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
        read_only_fields = ['id', 'restaurant', 'user', 'liked_by', 'like_count',  'comment_count', 'created_at']
        ref_name = "RestaurantReviewSerializer"

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Dynamically modify fields
        representation['liked_by'] = [
            user.username for user in instance.liked_by.all()
        ]
        if instance.created_at:
            representation['created_at'] = instance.created_at.strftime('%d.%m.%Y %H:%M')

        # Enforce field order using an ordered dictionary
        ordered_representation = OrderedDict([
            ('id', representation['id']),
            ('text_content', representation['text_content']),
            ('rating', representation['rating']),
            ('liked_by', representation['liked_by']),
            ('like_count', representation['like_count']),
            ('comment_count', representation['comment_count']),
            ('restaurant', representation['restaurant']),
            ('user', representation['user']),
            ('created_at', representation['created_at']),
        ])

        return ordered_representation

