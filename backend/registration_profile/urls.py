from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from registration_profile.views import RegistrationView, RegistrationProfileValidationView

urlpatterns = [
    path('registration/', RegistrationView.as_view(), name='registration'),
    path('registration/validate/',RegistrationProfileValidationView.as_view(), name='registration-profile-validation'),

]