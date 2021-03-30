from django.urls import path
from cosmetics_API import views

urlpatterns = [
    path('items', views.item_list),
    path('items/<int:item_id>', views.item_one),
    path('items/recom/<int:user_id>', views.item_recom),
    path('items/<str:category_large>', views.item_list_category_large),
    path('items/<str:category_large>/<str:category_middle>', views.item_list_category_mid)
]
