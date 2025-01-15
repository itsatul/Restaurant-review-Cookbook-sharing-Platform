from django.urls import path

from restaurant_category.views import CategoryListView

urlpatterns = [
    path('list/', CategoryListView.as_view(), name='category-list'),
]
