from django.contrib.auth import get_user_model
from rest_framework import serializers

from restaurant_review.models import RestaurantReview
from review_comment.models import ReviewComment

User = get_user_model()


class OwnerSerializer(serializers.ModelSerializer):
    review_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    def get_review_count(self, obj):
        # Ensure user_reviews is the correct related_name in your models
        return obj.user_reviews.count()

    def get_comment_count(self, obj):
        # Ensure user_comments is the correct related_name in your models
        return obj.user_comments.count()

    class Meta:
        model = User
        fields = ['id', 'username', 'review_count', 'comment_count', 'profile_picture']
        ref_name = 'Owner'


class RestaurantReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantReview
        fields = ['id', 'text_content']
        ref_name = "ReviewCommentRestaurantReviewSerializer"


class ReviewCommentSerializer(serializers.ModelSerializer):
    user = OwnerSerializer(read_only=True)
    restaurant_review = RestaurantReviewSerializer(read_only=True)

    class Meta:
        model = ReviewComment
        fields = ['id', 'comment', 'restaurant_review', 'user', 'date_created_comment']
        read_only_fields = ['id', 'restaurant_review', 'user', 'date_created_comment']

        def to_representation(self, instance):
            representation = super().to_representation(instance)
            if instance.date_created_comment:
                representation['date_created_comment'] = instance.date_created_comment.strftime('%d.%m.%Y %H:%M')
            return representation


class CreateReviewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewComment
        fields = ['id', 'comment']
        read_only_fields = ['id']
