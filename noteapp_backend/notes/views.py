from django.shortcuts import render
from rest_framework import generics
from .models import Note
from .serializers import NoteSerializer


# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
