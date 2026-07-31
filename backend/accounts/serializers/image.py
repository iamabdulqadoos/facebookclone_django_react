from rest_framework import serializers
from accounts.models.user import User


class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["profile_picture"]


class CoverPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["cover_photo"]