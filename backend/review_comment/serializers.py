from rest_framework import serializers

from review_comment.models import RestaurantReviewComment


class RestaurantReviewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model: RestaurantReviewComment
        fields = ['id', 'comment', 'restaurant_review', 'user']
