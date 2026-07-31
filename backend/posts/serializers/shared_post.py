from rest_framework import serializers
from posts.models.shared_post import SharedPost
from posts.serializers.post import PostSerializer


class SharedPostSerializer(serializers.ModelSerializer):
    original_post = PostSerializer(read_only=True)
    shared_by = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = SharedPost
        fields = [
            "id",
            "shared_by",
            "caption",
            "original_post",
            "created_at",
        ]