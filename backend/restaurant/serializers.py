from rest_framework import serializers

from luna_project.backend.restaurant.models import Restaurant
from luna_project.backend.restaurant_category.models import Category
from luna_project.backend.user.admin import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RestaurantSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    user = UserSerializer()

    class Meta:
        model = Restaurant
        fields = '__all__'



