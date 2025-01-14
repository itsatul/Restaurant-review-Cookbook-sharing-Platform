# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from restaurant_review.models import RestaurantReview
from restaurant_review.permissions import IsOwnerOrAdminOrReadOnly
from review_comment.models import ReviewComment
from .serializers import ReviewCommentSerializer

User = get_user_model()


class CommentsByLoggedInUserAPIView(ListAPIView):
    serializer_class = ReviewCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            raise NotFound(detail="Authentication required to view your comments.")
        return user.user_comments.all()


class CommentsbySingleUserAPIView(ListAPIView):
    serializer_class = ReviewCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        if not User.objects.filter(id=user_id).exists():
            raise NotFound(detail="User not found.")
        return ReviewComment.objects.filter(user_id=user_id)


class ListCommentsOnReviewAPIView(ListAPIView):
    serializer_class = ReviewCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        review_id = self.kwargs['review_id']
        if not RestaurantReview.objects.filter(id=review_id).exists():
            raise NotFound(detail="Review not found.")
        return ReviewComment.objects.filter(restaurant_review_id=review_id)


class CreateReviewCommentAPIView(CreateAPIView):
    serializer_class = ReviewCommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        review_id = self.kwargs.get('review_id')
        try:
            review = RestaurantReview.objects.get(id=review_id)
        except RestaurantReview.DoesNotExist:
            raise NotFound(detail="Review not found.")
        serializer.save(restaurant_review=review, user=self.request.user)


class DeleteReviewCommentAPIView(DestroyAPIView):
    serializer_class = ReviewCommentSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]

    def delete(self, request, *args, **kwargs):
        comment_id = self.kwargs.get('comment_id')
        comment = ReviewComment.objects.get(id=comment_id)
        comment.delete()
        return Response({"detail": "Comment deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
