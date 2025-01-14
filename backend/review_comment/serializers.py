from rest_framework import serializers

from review_comment.models import ReviewComment


class ReviewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model: ReviewComment
        fields = ['comment', 'restaurant', 'user']
