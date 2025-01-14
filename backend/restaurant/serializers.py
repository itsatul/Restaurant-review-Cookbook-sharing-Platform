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
    category = CategorySerializer()
    user = UserSerializer()

    class Meta:
        model = Restaurant
        fields = '__all__'



