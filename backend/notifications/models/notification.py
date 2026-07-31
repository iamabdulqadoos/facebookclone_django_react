from django.db import models
from accounts.models.user import User


class Notification(models.Model):

    # ==========================
    # Notification Constants
    # ==========================

    FRIEND_REQUEST = "friend_request"
    FRIEND_ACCEPTED = "friend_accepted"
    FRIEND_REJECTED = "friend_rejected"
    POST_LIKE = "post_like"
    COMMENT = "comment"
    POST_SHARE = "Post Share"
    NOTIFICATION_TYPES = (
        (FRIEND_REQUEST, "Friend Request"),
        (FRIEND_ACCEPTED, "Friend Accepted"),
        (FRIEND_REJECTED, "Friend Rejected"),
        (POST_LIKE, "Post Like"),
        (COMMENT, "Comment"),
        ("POST_SHARE", "Post Share"),
    )

    # ==========================
    # Sender
    # ==========================

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sent_notifications",
    )

    # ==========================
    # Receiver
    # ==========================

    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="received_notifications",
    )

    # ==========================
    # Notification Type
    # ==========================

    notification_type = models.CharField(
        max_length=30,
        choices=NOTIFICATION_TYPES,
    )

    # ==========================
    # Message
    # ==========================

    message = models.TextField()

    # ==========================
    # Read Status
    # ==========================

    is_read = models.BooleanField(
        default=False
    )

    # ==========================
    # Created Time
    # ==========================

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        ordering = [
            "-created_at"
        ]

    def __str__(self):

        return (
            f"{self.sender.username} → "
            f"{self.receiver.username}"
        )