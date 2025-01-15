# Create your views here.
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from restaurant.models import Restaurant
from restaurant.serializers import RestaurantSerializer
from restaurant_review.models import RestaurantReview
from restaurant_review.serializers import RestaurantReviewSerializer
from user.serializers import UserSerializer

User = get_user_model()


class SearchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        search_type = request.query_params.get('type', '').lower()
        search_string = request.query_params.get('search', '')

        if search_type == 'users':
            users = User.objects.filter(
                Q(username__icontains=search_string) | Q(email__icontains=search_string))
            if not users.exists():
                return Response(
                    {"error": f"No users found with '{search_string}'."},
                    status=status.HTTP_404_NOT_FOUND)
            serialized_data = UserSerializer(users, many=True).data
        elif search_type == 'restaurants':
            restaurants = Restaurant.objects.filter(name__icontains=search_string)
            if not restaurants.exists():
                return Response(
                    {"error": f"No restaurants found with '{search_string}'."},
                    status=status.HTTP_404_NOT_FOUND
                )
            serialized_data = RestaurantSerializer(restaurants, many=True).data
        elif search_type == 'reviews':
            reviews = RestaurantReview.objects.filter(text_content__icontains=search_string)
            if not reviews.exists():
                return Response(
                    {"error": f"No reviews found with '{search_string}'."},
                    status=status.HTTP_404_NOT_FOUND
                )
            serialized_data = RestaurantReviewSerializer(reviews, many=True).data
        else:
            return Response(
                {"error": "Invalid type. Must be 'users', 'restaurants', or 'reviews'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serialized_data, status=status.HTTP_200_OK)
