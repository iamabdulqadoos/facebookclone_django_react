from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from posts.models import Post
from posts.serializers.post import PostSerializer
from posts.pagination import FeedPagination


class FeedView(APIView):
    permission_classes = [IsAuthenticated]

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

        paginator = FeedPagination()

        result_page = paginator.paginate_queryset(
            posts,
            request
        )

        serializer = PostSerializer(
            result_page,
            many=True,
            context={"request": request}
        )

        return paginator.get_paginated_response(
            serializer.data
        )