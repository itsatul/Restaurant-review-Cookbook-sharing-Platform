# Create your views here.

from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from restaurant_review.models import Restaurant
from restaurant_review.serializers import RestaurantReviewSerializer

class CreateRestaurantReviewAPIView(CreateAPIView):
    serializer_class = RestaurantReviewSerializer

    def perform_create(self, serializer):
        restaurant_id = self.kwargs['restaurant_id']
        try:
            # Fetch the restaurant instance
            restaurant = Restaurant.objects.get(id=restaurant_id)
        except Restaurant.DoesNotExist:
            # Handle the case when the restaurant doesn't exist
            return Response(
                {"detail": "Restaurant not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        user = self.request.user
        serializer.save(restaurant=restaurant, user=user)
