from django.contrib import admin
from posts.models import Post, Comment, Like, SharedPost


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "created_at")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "post", "created_at")


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "post", "created_at")


@admin.register(SharedPost)
class SharedPostAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "original_post",
        "created_at",
    )