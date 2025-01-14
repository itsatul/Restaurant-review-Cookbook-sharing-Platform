# Create your views here.
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from luna_project.backend.restaurant.models import Restaurant
from luna_project.backend.restaurant.serializers import RestaurantSerializer


class RestaurantViewSet(APIView):
    # optional
    permission_classes = (IsAuthenticated)

    def get(self, request):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RestaurantCreateViewSet(APIView):
    permission_classes = (IsAuthenticated)

    def post(self, request):
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

