from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from notifications.utils import create_notification

from posts.models import Post, Like


class LikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):

        try:
            post = Post.objects.get(id=post_id)

        except Post.DoesNotExist:
            return Response(
                {
                    "error": "Post not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Create Like
        like, created = Like.objects.get_or_create(
            user=request.user,
            post=post
        )

        # Already liked
        if not created:
            return Response(
                {
                    "message": "You already liked this post"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Don't notify yourself
        if post.user != request.user:

            create_notification(
                sender=request.user,
                receiver=post.user,
                notification_type="post_like",
                message=f"{request.user.username} liked your post."
            )

        return Response(
            {
                "message": "Post liked successfully"
            },
            status=status.HTTP_201_CREATED
        )


class UnlikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):

        try:

            like = Like.objects.get(
                user=request.user,
                post_id=post_id
            )

        except Like.DoesNotExist:

            return Response(
                {
                    "message": "Like not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        like.delete()

        return Response(
            {
                "message": "Post unliked successfully"
            },
            status=status.HTTP_200_OK
        )