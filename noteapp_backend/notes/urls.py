from django.urls import path
from . import views

#Creating of my Urls.py file. Mapping the urls from view functions
urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list-create'),
    path('notes/<int:pk>/', views.NoteDetail.as_view(), name='note-detail'),
]