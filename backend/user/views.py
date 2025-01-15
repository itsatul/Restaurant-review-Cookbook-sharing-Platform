# Create your views here.
import random
import string

from django.core.mail import send_mail
from django.db.models import Q
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import User
from user.permissions import IsadminOrReadOnly
from user.serializers import UserSerializer, UserprofileSerializer


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

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


# class PasswordResetView(APIView): # passowrd reset without email
#
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         new_password = request.data.get('new_password')
#         confirm_password = request.data.get('confirm_password')
#
#         if not password or not new_password or not confirm_password or not username:
#             return Response(
#                 {"detail": "All fields are required"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#         try:
#             user = User.objects.get(username=username)
#         except User.DoesNotExist:
#             return Response(
#                 {"detail": "User does not exist"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )
#
#         if not user.check_password(password):
#             return Response(
#                 {"detail": "Current password is incorrect"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#         if new_password != confirm_password:
#             return Response(
#                 {"detail": "Passwords don't match"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#         user.set_password(new_password)
#         user.save()
#         return Response(
#             {"detail": "Password has been changed"},
#             status=status.HTTP_200_OK,
#         )


def code_generator(length=6):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')

        if not email:
            return Response({'error': 'Email address not provided'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
            reset_code = code_generator()
            user.profile.password_reset_code = reset_code
            user.profile.save()
            send_mail(
                'Password Reset Code',
                f'Your reset code is: {reset_code}',
                'Luna@gmail.com',
                [email],
                fail_silently=False,
            )
            return Response({'message': 'code sent'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'error': 'No user with that Email'}, status=status.HTTP_404_NOT_FOUND)


class PasswordValidationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        code = request.data.get('code')
        password = request.data.get('password')
        new_password = request.data.get('new_password')
        repeat_new_password = request.data.get('repeat_new_password')
        required_fields = {
            'email': email,
            'code': code,
            'password': password,
            'new_password': new_password,
            'repeat_new_password': repeat_new_password,

        }
        missing_fields = [field for field, value in required_fields.items() if not value]
        if missing_fields:
            return Response(
                {'error': 'Missing fields:', 'details': missing_fields},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            user = User.objects.get(email=email)
            if user.profile.password_reset_code != code:
                return Response({'error': 'Invalid reset code'}, status=status.HTTP_400_BAD_REQUEST)
            if not user.check_password(password):
                return Response({'error': 'Password does not match'}, status=status.HTTP_400_BAD_REQUEST)
            if new_password != repeat_new_password:
                return Response({'error': 'New Password does not match'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            # user.profile.password_reset_code = None
            user.profile.save()
            user.save()
            return Response({'message': 'Password updated'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'No user with that email'}, status=status.HTTP_404_NOT_FOUND)
