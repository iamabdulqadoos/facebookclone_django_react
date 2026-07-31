from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from posts.models import Post, SavedPost
from posts.serializers.post import PostSerializer

class SavePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):

        try:
            post = Post.objects.get(id=post_id)

        except Post.DoesNotExist:
            return Response(
                {"error": "Post not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if SavedPost.objects.filter(
            user=request.user,
            post=post
        ).exists():

            return Response(
                {"message": "Already saved"}
            )

        SavedPost.objects.create(
            user=request.user,
            post=post
        )

        return Response(
            {"message": "Post saved successfully"}
        )
    
class UnsavePostView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id):

        try:
            saved = SavedPost.objects.get(
                user=request.user,
                post_id=post_id
            )

        except SavedPost.DoesNotExist:
            return Response(
                {"error": "Saved post not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        saved.delete()

        return Response(
            {"message": "Post removed from saved posts"}
        )
    
class SavedPostListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        saved_posts = SavedPost.objects.filter(
            user=request.user
        ).select_related("post")

        posts = [saved.post for saved in saved_posts]

        serializer = PostSerializer(
            posts,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)