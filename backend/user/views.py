# Create your views here.
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import User

class GetAllUsersView(APIView):


    def get(self, request):
        users = User.objects.all()
        users_data = [user.id for user in users]
        return Response(users_data, status=status.HTTP_200_OK)
