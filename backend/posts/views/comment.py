from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from notifications.models import Notification
from notifications.utils import create_notification
from posts.models import Post, Comment
from posts.serializers.comment import CommentSerializer


class CommentListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        comments = Comment.objects.filter(
            post_id=post_id
        ).order_by("created_at")

        serializer = CommentSerializer(
            comments,
            many=True
        )

        return Response(serializer.data)

    def post(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response(
                {"error": "Post not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                user=request.user,
                post=post
            )
            if post.user != request.user:

                create_notification(
                    sender=request.user,
                    receiver=post.user,
                    notification_type="comment",
                    message=f"{request.user.username} commented on your post."
                )
    
            return Response(
                {
                    "message": "Comment Created Successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class CommentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            return None

    def get(self, request, pk):
        comment = self.get_object(pk)

        if comment is None:
            return Response(
                {"error": "Comment not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CommentSerializer(comment)

        return Response(serializer.data)

    def put(self, request, pk):
        comment = self.get_object(pk)

        if comment is None:
            return Response(
                {"error": "Comment not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if comment.user != request.user:
            return Response(
                {"error": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = CommentSerializer(
            comment,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Comment Updated Successfully",
                    "data": serializer.data
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        comment = self.get_object(pk)

        if comment is None:
            return Response(
                {"error": "Comment not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if comment.user != request.user:
            return Response(
                {"error": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        comment.delete()

        return Response(
            {"message": "Comment Deleted Successfully"},
            status=status.HTTP_204_NO_CONTENT
        )