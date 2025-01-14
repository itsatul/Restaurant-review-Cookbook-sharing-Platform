from django.urls import path

from restaurant_review.views import CreateRestaurantReviewAPIView, ListRestaurantReviewAPIView, ListUsersReviewAPIView, \
    RetrieveUpdateDestroyReviewAPIView, ToggleLikeReviewAPIView, LikesByLoggedInUserAPIView

urlpatterns = [

    path('new/<int:restaurant_id>/', CreateRestaurantReviewAPIView.as_view()),
    path('restaurant/<int:restaurant_id>/',ListRestaurantReviewAPIView.as_view()),
    path('user/<int:user_id>/', ListUsersReviewAPIView.as_view()),
    path('<int:review_id>/', RetrieveUpdateDestroyReviewAPIView.as_view()),
    path('like/<int:review_id>/',ToggleLikeReviewAPIView.as_view()),
    path('likes/', LikesByLoggedInUserAPIView.as_view()),




]
