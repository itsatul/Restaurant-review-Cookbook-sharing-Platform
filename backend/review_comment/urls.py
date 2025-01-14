from django.urls import path

from review_comment.views import CommentsByLoggedInUserAPIView, CommentsbySingleUserAPIView, CreateReviewCommentAPIView, \
    DeleteReviewCommentAPIView, ListCommentsOnReviewAPIView

urlpatterns = [
    path('reviews/comments/', CommentsByLoggedInUserAPIView.as_view()),
    path('review/comment/user/<int:user_id>/', CommentsbySingleUserAPIView.as_view()),
    path('review/comment/<int:review_id>/', ListCommentsOnReviewAPIView.as_view()),
    path('review/comment/new/<int:review_id>/', CreateReviewCommentAPIView.as_view()),
    path('review/comment/<int:comment_id>/', DeleteReviewCommentAPIView.as_view()),

]
