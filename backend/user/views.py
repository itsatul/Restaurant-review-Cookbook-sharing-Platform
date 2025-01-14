# Create your views here.
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import User
from user.serializers import UserSerializer


class GetAllUsersView(APIView):

    def get(self, request):
        permission_classes = [IsAuthenticated]
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    # def get(self, request):
    #     permission_classes = [IsAuthenticated]
    #     users = User.objects.all()
    #     users_data = [user.id for user in users]
    #     return Response(users_data, status=status.HTTP_200_OK)
    # def post(self, request):
    #     users_data = request.data
    #     serializer = UserSerializer(data=users_data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def post(self, request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserSerializer
        return


# class GetUserView(APIView):
#     def get(self, request, user_id):
#         user = User.objects.get(id=user_id)
#         user_data = [user.id for user in user]
#         return Response(user_data, status=status.HTTP_200_OK)
