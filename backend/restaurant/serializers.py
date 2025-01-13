from rest_framework import serializers

from luna_project.backend.restaurant.models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    restaurant_reviews = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'country', 'street', 'city', 'zipcode', 'website', 'phone', 'email', 'opening_hours',
            'price_level',
            'image', 'category', 'user'
        ]

    def get_category(self, obj):
        return obj.category.name if obj.category else None

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
            'email': obj.user.email
        }
