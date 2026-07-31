from django.urls import path
from posts.views.search import PostSearchView
from posts.views.feed import FeedView
from posts.views.post import (
    PostListCreateView,
    PostDetailView,
)
from posts.views.comment import (
    CommentListCreateView,
    CommentDetailView,
)
from posts.views.like import (
    LikePostView,
    UnlikePostView,
)
from posts.views.saved_post import (
    SavePostView,
    UnsavePostView,
    SavedPostListView,
)

from posts.views.shared_post import (
    SharePostView,
    SharedPostListView,
    DeleteSharedPostView,
)
urlpatterns = [
    # Posts
    path("", PostListCreateView.as_view(), name="posts"),
    path("<int:pk>/", PostDetailView.as_view(), name="post-detail"),

    # Comments
    path(
        "<int:post_id>/comments/",
        CommentListCreateView.as_view(),
        name="comments",
    ),

    path(
        "comments/<int:pk>/",
        CommentDetailView.as_view(),
        name="comment-detail",
    ),

path(
    "<int:post_id>/like/",
    LikePostView.as_view(),
    name="like-post"
),

path(
    "<int:post_id>/unlike/",
    UnlikePostView.as_view(),
    name="unlike-post"
),
path(
    "feed/",
    FeedView.as_view(),
    name="feed",
),
path(
    "search/",
    PostSearchView.as_view(),
    name="post-search",
),
path(
    "save/<int:post_id>/",
    SavePostView.as_view(),
    name="save-post",
),

path(
    "unsave/<int:post_id>/",
    UnsavePostView.as_view(),
    name="unsave-post",
),

path(
    "saved/",
    SavedPostListView.as_view(),
    name="saved-posts",
),
path(
    "share/<int:post_id>/",
    SharePostView.as_view(),
    name="share-post",
),

path(
    "shared/",
    SharedPostListView.as_view(),
    name="shared-posts",
),

path(
    "shared/delete/<int:shared_post_id>/",
    DeleteSharedPostView.as_view(),
    name="delete-shared-post",
),
]