"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from project import settings
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

schema_view = get_schema_view(
    openapi.Info(
        title="Django REST API",
        default_version="v1",
        description="Luna",  # you can modify to your preference
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="academy@constructor.org"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[AllowAny, ])

urlpatterns = [
    path('backend/admin/', admin.site.urls),

    path('backend/api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('backend/api/auth/token/refresh/', TokenRefreshView.as_view(), name='retrieve-refreshed-token'),
    path('backend/api/auth/token/verify/', TokenVerifyView.as_view(), name='verify-token'),
    path('backend/api/reviews/', include('restaurant_review.urls')),

    path('backend/', include('user.urls', )),
    path('backend/api/', include('registration_profile.urls')),

    path('backend/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('backend/api/', include('review_comment.urls')),
    path('backend/api/restaurants/', include('restaurant.urls')),
    path('backend/api/category/', include('restaurant_category.urls')),
    path('backend/api/search/', include('user_profile.urls'))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
