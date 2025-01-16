# Create your views here.
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.views import APIView

from restaurant_category.models import Category
from restaurant_category.serializers import CategorySerializer
from drf_yasg import openapi


class CategoryListView(APIView):
    @swagger_auto_schema(
        operation_description="Retrieves all restaurant categories.  Authentication is required via Bearer token.",
        responses={200: CategorySerializer(many=True)},
        manual_parameters=[
            openapi.Parameter(
                'Authorization',
                openapi.IN_HEADER,
                description="Bearer token for authentication",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
