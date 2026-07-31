from rest_framework import serializers
from posts.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Comment

        fields = [
            "id",
            "username",
            "post",
            "comment",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "username",
            "created_at",
            "updated_at",
            "post",
        ]