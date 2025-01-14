from django.urls import path
from restaurant.views import (
    ListRestaurantAPIView,
    RestaurantCreateViewSet,
    ListRestaurantByCategoryAPIView,
    RestaurantCreatedByUserAPIView,
    RestaurantDetailsByRestaurantIdAPIView,
    RestaurantUpdateByRestaurantIdAPIView,
    RestaurantDeleteByRestaurantIdAPIView
)

urlpatterns = [
    path('restaurants/', ListRestaurantAPIView.as_view(), name='list-restaurants'),
    path('restaurants/new/', RestaurantCreateViewSet.as_view(), name='create-restaurant'),
    path('restaurants/category/<int:category_id>/', ListRestaurantByCategoryAPIView.as_view(), name='list-restaurants-by-category'),
    path('restaurants/user/<int:user_id>/', RestaurantCreatedByUserAPIView.as_view(), name='restaurants-by-user'),
    path('restaurants/<int:restaurant_id>/', RestaurantDetailsByRestaurantIdAPIView.as_view(), name='restaurant-details'),
    path('restaurants/<int:restaurant_id>/', RestaurantUpdateByRestaurantIdAPIView.as_view(), name='restaurant-update'),
    path('restaurants/<int:restaurant_id>/', RestaurantDeleteByRestaurantIdAPIView.as_view(), name='restaurant-delete'),
]
