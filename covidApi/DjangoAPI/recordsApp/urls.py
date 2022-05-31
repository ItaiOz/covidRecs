# from django.conf.urls import url
from django.urls import path
from recordsApp import views

urlpatterns = [
    path('records', views.recordsApi)
]