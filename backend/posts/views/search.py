from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from posts.models import Post
from posts.serializers.post import PostSerializer


class PostSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        query = request.GET.get("q")

        if not query:
            return Response([])

        posts = Post.objects.filter(
            content__icontains=query
        ).order_by("-created_at")

        serializer = PostSerializer(
            posts,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)