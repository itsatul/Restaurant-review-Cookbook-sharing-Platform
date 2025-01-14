from rest_framework import serializers

from restaurant_review.models import RestaurantReview


class RestaurantReviewSerializer(serializers.ModelSerializer):
    liked_by = serializers.PrimaryKeyRelatedField(
        many=True,  # Because it's a ManyToManyField
        read_only=True  # Prevent users from modifying the liked_by field directly
    )

    class Meta:
        model = RestaurantReview
        fields = ['restaurant', 'user', 'text_content', 'rating', 'liked_by']
        read_only_fields = ['restaurant', 'user', 'liked_by']
