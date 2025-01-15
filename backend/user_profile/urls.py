from django.urls import path

from restaurant.views import OrderRestaurantsByRatingAPIView
from user_profile.views import SearchView

urlpatterns = [
    path('search/', SearchView.as_view()),
    path('home/',OrderRestaurantsByRatingAPIView.as_view()),
]
