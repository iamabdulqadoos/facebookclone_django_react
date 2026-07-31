from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError


class FriendRequest(models.Model):

    PENDING = "Pending"
    ACCEPTED = "Accepted"
    REJECTED = "Rejected"

    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (ACCEPTED, "Accepted"),
        (REJECTED, "Rejected"),
    ]

    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_requests"
    )

    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="received_requests"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=PENDING
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        unique_together = ("sender", "receiver")

        ordering = [
            "-created_at"
        ]

    def clean(self):

        if self.sender == self.receiver:

            raise ValidationError(
                "You cannot send a friend request to yourself."
            )

    def __str__(self):

        return (
            f"{self.sender.username} → "
            f"{self.receiver.username} "
            f"({self.status})"
        )