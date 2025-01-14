from django.urls import path

from user.views import GetAllUsersView, UserProfileView, SearchUsersView, RetrieveOnlyUsersById, PasswordResetView

urlpatterns = [
        path('api/users/list/', GetAllUsersView.as_view(), name='get_all_users'),

        path('api/me/',UserProfileView.as_view(), name='get_user'),
        path('api/users/search/', SearchUsersView.as_view(), name='search_users'),
        path('api/users/<int:pk>/', RetrieveOnlyUsersById.as_view(), name='get_user'),

        path('api/auth/password-reset/', PasswordResetView.as_view(), name='password_reset'),

    ]