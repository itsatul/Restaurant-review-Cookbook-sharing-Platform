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
    path('', ListRestaurantAPIView.as_view(), name='list-restaurants'),
    path('new/', RestaurantCreateViewSet.as_view(), name='create-restaurant'),
    path('category/<int:category_id>/', ListRestaurantByCategoryAPIView.as_view(),
         name='list-restaurants-by-category'),
    path('user/<int:user_id>/', RestaurantCreatedByUserAPIView.as_view(), name='restaurants-by-user'),
    path('<int:restaurant_id>/', RestaurantDetailsByRestaurantIdAPIView.as_view(),
         name='restaurant-details'),
    path('<int:restaurant_id>/', RestaurantUpdateByRestaurantIdAPIView.as_view(), name='restaurant-update'),
    path('<int:restaurant_id>/', RestaurantDeleteByRestaurantIdAPIView.as_view(), name='restaurant-delete'),
]
