from django.urls import path
from personal_API import views

urlpatterns = [
    path('', views.personalColorTest),
]
