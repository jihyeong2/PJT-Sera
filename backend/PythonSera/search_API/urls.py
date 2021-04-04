from django.urls import path
from search_API import views

urlpatterns = [
    path('<int:user_id>/<str:keyword>', views.searchItems),
]
