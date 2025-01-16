# Create your views here.

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from registration_profile.models import RegistrationProfile
from registration_profile.serializers import RegistrationSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()
class RegistrationView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'email',
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                required=True,
                example=("example@gmail.com")
            )
        ],
        operation_description=(
                "Register Yourself in Luna\n"
                "Introduce your gmail and code will be sent to your gmail account. "
        ),
    )

    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            # check if the user already exists
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email is already registered'}, status=status.HTTP_400_BAD_REQUEST)

            new_user = User.objects.create(email=email)

            # trigger the creation of the RegistrationProfile via post_save signal
            registration_profile = RegistrationProfile.objects.get(user=new_user)

            # send email with the registration code
            send_mail(
                'Your registration code',
                f'Your registration code is {registration_profile.code}',
                'garjony722@gmail.com',
                [email],
                fail_silently=False,
            )
            return Response({'message': 'Registration code sent successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistrationProfileValidationView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        manual_parameters=[
                              openapi.Parameter(
                                  'code',
                                  openapi.IN_QUERY,
                                  type=openapi.TYPE_STRING,
                                  required=True,
                                  example=("5fsf5sf")
                              )
                          ] +[

                              openapi.Parameter(
                                  'email',
                                  openapi.IN_QUERY,
                                  type=openapi.TYPE_STRING,
                                  required=True,
                                  example=("example@gmail.com")
                              )
                          ] +  [
                              openapi.Parameter(
                                  'password',
                                  openapi.IN_QUERY,
                                  type=openapi.TYPE_STRING,
                                  required=True,
                                  example=("9342345f")
                              )
                          ] + [
                              openapi.Parameter(
                                  'Repeat_password',
                                  openapi.IN_QUERY,
                                  type=openapi.TYPE_STRING,
                                  required=True,
                                  example=("9342345f")
                              )
                          ] + [
                              openapi.Parameter(
                                  'first_name',
                                  openapi.IN_QUERY,
                                  type=openapi.TYPE_STRING,
                                  required=True,
                                  example=("john")
                              )
                          ]+ [
                              openapi.Parameter(
                                  'last_name',
                                  openapi.IN_QUERY,
                                  type=openapi.TYPE_STRING,
                                  required=True,
                                  example=("Lenon")
                              )
                          ],
        operation_description=(
                "Register Yourself in Luna (VALIDATION)\n"
                "after reciving the code in gmail.\n"
                "Introduce all required parameters "
        ),

    )

    def post(self, request, *args, **kwargs):
        code = request.data.get('code')
        email = request.data.get('email')
        password = request.data.get('password')
        repeat_password = request.data.get('repeat_password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        required_fields = {
            'code': code,
            'email': email,
            'password': password,
            'repeat_password': repeat_password,
            'first_name': first_name,
            'last_name': last_name,
        }
        missing_fields = [field for field, value in required_fields.items() if not value]

        if missing_fields:
            return Response(
                {'error': 'Missing fields:', 'details': missing_fields},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            registration_profile = RegistrationProfile.objects.get(code=code)
            user = registration_profile.user
            user.email = email
            user.password = make_password(password)
            user.first_name = first_name
            user.last_name = last_name
            user.is_active = True
            user.save()
            registration_profile.delete()
            return Response({'message': 'User created '}, status=status.HTTP_200_OK)
        except RegistrationProfile.DoesNotExist:
            return Response({'error': 'Invalid code'}, status=status.HTTP_400_BAD_REQUEST)
