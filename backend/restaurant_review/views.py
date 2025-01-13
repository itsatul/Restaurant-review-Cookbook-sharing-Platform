# Create your views here.
from rest_framework.generics import CreateAPIView
from restaurant_review.models import Restaurant
from restaurant_review.serializers import RestaurantReviewSerializer

class CreateRestaurantReviewAPIView(CreateAPIView):
    serializer_class = RestaurantReviewSerializer

    def perform_create(self, serializer):
        restaurant_id = self.kwargs['restaurant_id']
        restaurant = Restaurant.objects.get(id=restaurant_id)
        user = self.request.user
        serializer.save(restaurant=restaurant, user=user)
