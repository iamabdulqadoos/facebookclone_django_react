from rest_framework import serializers
from accounts.models.user import User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [

    "id",
    "username",
    "email",

    "first_name",
    "last_name",

    "profile_picture",
    "cover_photo",

    "bio",

    "phone",
    "date_of_birth",
    "gender",

    "city",
    "country",

    "workplace",
    "education",

    "relationship_status",

    "website",

]
        read_only_fields = ["id", "username", "email"]