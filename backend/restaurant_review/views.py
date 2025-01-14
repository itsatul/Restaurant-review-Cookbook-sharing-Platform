# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from restaurant_review.models import Restaurant
from restaurant_review.models import RestaurantReview
from restaurant_review.permissions import IsOwnerOrAdminOrReadOnly
from restaurant_review.serializers import RestaurantReviewSerializer

User = get_user_model()


class CreateRestaurantReviewAPIView(CreateAPIView):
    serializer_class = RestaurantReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        restaurant_id = self.kwargs.get('restaurant_id')

        # Fetch the restaurant instance
        try:
            restaurant = Restaurant.objects.get(id=restaurant_id)
        except Restaurant.DoesNotExist:
            raise ValidationError({"error": "Restaurant not found."})

        # Check if a review already exists for this user and restaurant
        user = self.request.user
        if RestaurantReview.objects.filter(restaurant=restaurant, user=user).exists():
            raise ValidationError({"error": "You have already reviewed this restaurant."})

        # Pass the restaurant and user to the serializer to create the review
        serializer.save(restaurant=restaurant, user=user)


class ListRestaurantReviewAPIView(ListAPIView):
    queryset = RestaurantReview.objects.all()
    serializer_class = RestaurantReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        restaurant_id = self.kwargs['restaurant_id']
        if not Restaurant.objects.filter(id=restaurant_id).exists():
            raise NotFound(detail="Restaurant not found.")
        return RestaurantReview.objects.filter(restaurant_id=restaurant_id)


class ListUsersReviewAPIView(ListAPIView):
    queryset = RestaurantReview.objects.all()
    permission_classes = [AllowAny]

    serializer_class = RestaurantReviewSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        try:
            user = User.objects.get(id=user_id)  # Attempt to retrieve the user
        except User.DoesNotExist:
            raise NotFound(detail="User not found.")
        return RestaurantReview.objects.filter(user_id=user_id)


class RetrieveUpdateDestroyReviewAPIView(RetrieveUpdateDestroyAPIView):
    queryset = RestaurantReview.objects.all()
    serializer_class = RestaurantReviewSerializer
    lookup_url_kwarg = 'review_id'

    def get_permissions(self):
        # Define permissions based on the HTTP method
        if self.request.method == 'GET':
            return [AllowAny()]  # Allow anyone to retrieve the review
        elif self.request.method in ['PATCH', 'DELETE']:
            return [IsOwnerOrAdminOrReadOnly()]  # Only the owner or admin can edit or delete
        return [IsAuthenticated()]

    def get_queryset(self):
        review_id = self.kwargs['review_id']
        if not RestaurantReview.objects.filter(id=review_id).exists():
            raise NotFound(detail="Review not found.")
        return RestaurantReview.objects.filter(id=review_id)

    def delete(self, request, *args, **kwargs):
        review = self.get_object()
        review.delete()
        return Response({"detail": "Review deleted successfully."}, status=204)


class ToggleLikeReviewAPIView(GenericAPIView):
    queryset = RestaurantReview.objects.all()
    serializer_class = RestaurantReviewSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'review_id'

    def patch(self, request, *args, **kwargs):
        review = self.get_object()
        user = self.request.user
        user_liked = user in review.liked_by.all()
        if user_liked:
            review.liked_by.remove(user)
            review.save()
        else:
            review.liked_by.add(user)
            review.save()
        return Response(self.get_serializer(review).data, status=status.HTTP_200_OK)


class LikesByLoggedInUserAPIView(ListAPIView):
    serializer_class = RestaurantReviewSerializer
    queryset = RestaurantReview.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        reviews = user.liked_reviews.all()
        return reviews
