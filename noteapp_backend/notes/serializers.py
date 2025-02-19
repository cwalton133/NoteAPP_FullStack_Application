from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'  # Or specify individual fields: ('id', 'title', 'content', 'created_at')
