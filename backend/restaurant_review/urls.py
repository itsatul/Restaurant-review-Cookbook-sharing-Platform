from django.urls import path

from restaurant_review.views import CreateRestaurantReviewAPIView

urlpatterns = [

    path('new/<int:restaurant_id>/', CreateRestaurantReviewAPIView.as_view()),



]
