from django.urls import include, path
from . import views

urlpatterns = [
    path('bands', views.bands, name="bands"),
    path('musicUrl', views.music_url, name="musicUrl")
]
