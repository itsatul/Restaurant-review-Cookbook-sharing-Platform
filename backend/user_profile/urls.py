from django.urls import path

from user_profile.views import SearchView

urlpatterns = [
    path('', SearchView.as_view()),
]
