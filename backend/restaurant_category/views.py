# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView

from restaurant_category.models import Category
from restaurant_category.serializers import CategorySerializer


class CategoryListView(APIView):

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
