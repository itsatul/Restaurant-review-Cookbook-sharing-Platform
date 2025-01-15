from os import path

from restaurant_category.views import CategoryListView

urlpatterns = [
    path('category/list/', CategoryListView.as_view(), name='category-list'),
]
