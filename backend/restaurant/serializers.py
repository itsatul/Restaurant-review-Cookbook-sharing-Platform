from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers

from restaurant.models import Restaurant
from restaurant_category.models import Category
from user.admin import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RestaurantSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    user = UserSerializer(read_only=True)
    average_rating = serializers.DecimalField(
        read_only=True,
        max_digits=3,
        decimal_places=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'street', 'city', 'average_rating', 'zip', 'website', 'phone', 'email', 'opening_hours',
                  'price_level', 'image', 'category', 'user', 'country']

    def create(self, validated_data):
        # Extract category name
        category_name = validated_data.pop('category')

        # Try to get the category by name
        category = Category.objects.filter(name=category_name).first()  # Get the first category with this name

        if not category:
            raise serializers.ValidationError(f"Category with name '{category_name}' does not exist.")

        # Create the restaurant instance with the validated data and category
        restaurant = Restaurant.objects.create(category=category, **validated_data)

        return restaurant
