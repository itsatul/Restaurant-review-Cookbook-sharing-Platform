from django.urls import path

from registration_profile.views import RegistrationView, RegistrationProfileValidationView

urlpatterns = [
    path('registration/', RegistrationView.as_view(), name='registration'),
    path('registration/validate/', RegistrationProfileValidationView.as_view(), name='registration-profile-validation'),

]
