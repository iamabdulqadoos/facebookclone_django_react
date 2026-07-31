from rest_framework import serializers
from posts.models import Like


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = "__all__"
        read_only_fields = ["user", "post"]