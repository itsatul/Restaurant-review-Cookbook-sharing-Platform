from rest_framework import serializers

from review_comment.models import ReviewComment
User = get
class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
class ReviewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model: ReviewComment
        fields = ['comment', 'restaurant', 'user']
