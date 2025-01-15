from django.urls import path

from review_comment.views import CommentsbySingleUserAPIView, CreateReviewCommentAPIView, \
    DeleteReviewCommentAPIView, ListCommentsOnReviewAPIView

urlpatterns = [
    # path('reviews/comments/', CommentsByLoggedInUserAPIView.as_view()),
    path('user/<int:user_id>/', CommentsbySingleUserAPIView.as_view()),
    path('<int:review_id>/', ListCommentsOnReviewAPIView.as_view()),
    path('new/<int:review_id>/', CreateReviewCommentAPIView.as_view()),
    path('delete/<int:comment_id>/', DeleteReviewCommentAPIView.as_view()),

]
