from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from posts.models import Post
from posts.serializers.post import PostSerializer


class PostListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    # Get All Posts
    def get(self, request):
        posts = (
        Post.objects
        .select_related("user")
        .prefetch_related(
            "likes",
            "comments",
            "shares",
        )
        .order_by("-created_at")
)

        serializer = PostSerializer(
            posts,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)

    # Create Post
    def post(self, request):
        serializer = PostSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(
                {
                    "message": "Post Created Successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class PostDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return None

    # Get Single Post
    def get(self, request, pk):
        post = self.get_object(pk)

        if post is None:
            return Response(
                {"error": "Post not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = PostSerializer(
            post,
            context={"request": request}
        )

        return Response(serializer.data)

    # Update Post
    def put(self, request, pk):
        post = self.get_object(pk)

        if post is None:
            return Response(
                {"error": "Post not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if post.user != request.user:
            return Response(
                {"error": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = PostSerializer(
            post,
            data=request.data,
            partial=True,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Post Updated Successfully",
                    "data": serializer.data,
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Delete Post
    def delete(self, request, pk):
        post = self.get_object(pk)

        if post is None:
            return Response(
                {"error": "Post not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if post.user != request.user:
            return Response(
                {"error": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        post.delete()

        return Response(
            {"message": "Post Deleted Successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )