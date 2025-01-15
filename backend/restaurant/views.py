from django.db.models import Avg
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from restaurant.models import Restaurant
from restaurant.serializers import RestaurantSerializer
from restaurant_review.permissions import IsOwnerOrAdminOrReadOnly


class ListRestaurantAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RestaurantCreateViewSet(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListRestaurantByCategoryAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        category_name = request.query_params.get('category', None)
        if category_name:
            restaurants = Restaurant.objects.filter(category__name__icontains=category_name)
        else:
            restaurants = Restaurant.objects.all()

        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RestaurantCreatedByUserAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, user_id):
        restaurants = Restaurant.objects.filter(user_id=user_id).order_by('created_at')
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RestaurantDetailsByRestaurantIdAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, restaurant_id):
        try:
            restaurant = Restaurant.objects.get(id=restaurant_id)
            serializer = RestaurantSerializer(restaurant)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Restaurant.DoesNotExist:
            raise NotFound(detail='Restaurant does not exist')


class RestaurantUpdateByRestaurantIdAPIView(APIView):
    permission_classes = (IsOwnerOrAdminOrReadOnly,)

    def patch(self, request, restaurant_id):
        try:
            restaurant = Restaurant.objects.get(id=restaurant_id)

            if restaurant.user != request.user:
                raise PermissionDenied(detail="You do not have permission to perform this action")

            serializer = RestaurantSerializer(restaurant, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Restaurant.DoesNotExist:
            raise NotFound(detail='Restaurant does not exist')


class RestaurantDeleteByRestaurantIdAPIView(APIView):
    permission_classes = (IsOwnerOrAdminOrReadOnly,)

    def delete(self, request, restaurant_id):
        try:
            restaurant = Restaurant.objects.get(id=restaurant_id)

            if restaurant.user != request.user:
                raise PermissionDenied(detail="You do not have permission to perform this action")

            restaurant.delete()
            return Response({"detail": "Restaurant deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

        except Restaurant.DoesNotExist:
            raise NotFound(detail='Restaurant does not exist')


class OrderRestaurantsByRatingAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RestaurantSerializer

    def get(self, request):
        restaurants = Restaurant.objects.annotate(
            average_rating=Avg('restaurant_reviews__rating')
        ).order_by('-average_rating')[:4]
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
