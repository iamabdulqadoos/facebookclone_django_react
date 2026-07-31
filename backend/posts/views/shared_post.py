from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from posts.models.post import Post
from posts.models.shared_post import SharedPost
from posts.serializers.shared_post import SharedPostSerializer

from notifications.utils import create_notification
from notifications.models import Notification


class SharePostView(APIView):
    permission_classes = [IsAuthenticated]

    # ==========================
    # Share Post
    # ==========================

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

        shared_post, created = SharedPost.objects.get_or_create(
            user=request.user,
            original_post=post,
            defaults={
                "caption": request.data.get(
                    "caption",
                    ""
                )
            }
        )

        if not created:

            return Response(
                {
                    "message": "You have already shared this post."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if post.user != request.user:

            create_notification(
                sender=request.user,
                receiver=post.user,
                notification_type="post_share",
                message=f"{request.user.username} shared your post."
            )

        serializer = SharedPostSerializer(
            shared_post,
            context={
                "request": request
            }
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    # ==========================
    # Unshare Post
    # ==========================

    def delete(self, request, post_id):

        try:

            shared_post = SharedPost.objects.get(
                user=request.user,
                original_post_id=post_id
            )

        except SharedPost.DoesNotExist:

            return Response(
                {
                    "error": "Shared post not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        shared_post.delete()

        return Response(
            {
                "message": "Post unshared successfully."
            },
            status=status.HTTP_200_OK
        )


class SharedPostListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        shared_posts = SharedPost.objects.all()

        serializer = SharedPostSerializer(
            shared_posts,
            many=True,
            context={
                "request": request
            }
        )

        return Response(serializer.data)


class DeleteSharedPostView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, shared_post_id):

        try:

            shared_post = SharedPost.objects.get(
                id=shared_post_id,
                user=request.user
            )

        except SharedPost.DoesNotExist:

            return Response(
                {
                    "error": "Shared post not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        shared_post.delete()

        return Response(
            {
                "message": "Shared post deleted successfully"
            },
            status=status.HTTP_200_OK
        )