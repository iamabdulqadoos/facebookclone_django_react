from django.db import models
from django.conf import settings
from posts.models.post import Post


class SharedPost(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="shared_posts",
    )

    original_post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="shares",
    )

    caption = models.TextField(
        blank=True,
        default="",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["-created_at"]
        unique_together = ("user", "original_post")

    def __str__(self):
        return f"{self.user.username} shared Post {self.original_post.id}"