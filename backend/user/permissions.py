
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsadminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.user.is_staff )
