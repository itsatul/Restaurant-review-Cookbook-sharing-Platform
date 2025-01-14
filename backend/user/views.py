# Create your views here.
from http.client import responses

from django.contrib.auth.handlers.modwsgi import check_password
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import User
from user.permissions import IsadminOrReadOnly
from user.serializers import UserSerializer, UserprofileSerializer
from django.db.models import Q


class GetAllUsersView(ListCreateAPIView):
    permission_classes = [IsadminOrReadOnly]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserprofileSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user

class SearchUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search_string = request.query_params.get('search', '')
        users = User.objects.filter(
            Q(username__icontains=search_string) | Q(email__icontains=search_string)
        )
        users_data = UserSerializer(users, many=True).data
        return Response(users_data, status=status.HTTP_200_OK)

class RetrieveOnlyUsersById(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request,*args,**kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class PasswordResetView(APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not password or not new_password or not confirm_password or not username:
            return Response(
                {"detail": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(
                {"detail": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if not user.check_password(password):
            return Response(
                {"detail": "Current password is incorrect"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if new_password != confirm_password:
            return Response(
                {"detail": "Passwords don't match"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user.set_password(new_password)
        user.save()
        return Response(
            {"detail": "Password has been changed"},
            status=status.HTTP_200_OK,
        )
