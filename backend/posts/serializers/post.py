from rest_framework import serializers
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    profile_picture = serializers.ImageField(
        source="user.profile_picture",
        read_only=True
    )

    likes_count = serializers.SerializerMethodField()

    comments_count = serializers.SerializerMethodField()

    share_count = serializers.SerializerMethodField()

    is_liked = serializers.SerializerMethodField()

    is_shared = serializers.SerializerMethodField()

    class Meta:
        model = Post

        fields = [
            "id",
            "username",
            "profile_picture",
            "content",
            "image",
            "likes_count",
            "comments_count",
            "share_count",
            "is_liked",
            "is_shared",
            "created_at",
            "updated_at",
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_share_count(self, obj):
        return obj.shares.count()

    
    def get_is_liked(self, obj):
        request = self.context.get("request")

        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()

        return False

    def get_is_shared(self, obj):

        request = self.context.get("request")

        if request and request.user.is_authenticated:

            return obj.shares.filter(
            user=request.user
        ).exists()

        return False