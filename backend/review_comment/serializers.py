from django.contrib.auth import get_user_model
from rest_framework import serializers

from restaurant_review.models import RestaurantReview
from review_comment.models import ReviewComment

User = get_user_model()


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class RestaurantReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantReview
        fields = ['id', 'text_content']


class ReviewCommentSerializer(serializers.ModelSerializer):
    user = OwnerSerializer()
    restaurant_review = RestaurantReviewSerializer()

    class Meta:
        model = ReviewComment
        fields = ['id', 'comment', 'restaurant_review', 'user']
        read_only_fields = ['id', 'restaurant_review', 'user']


class CreateReviewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewComment
        fields = ['id', 'comment']
        read_only_fields = ['id']
