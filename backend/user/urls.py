from django.urls import path

from user.views import GetAllUsersView

urlpatterns = [
        path('api/users/list/', GetAllUsersView.as_view(), name='get_all_users'),

    ]