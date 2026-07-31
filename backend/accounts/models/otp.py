from datetime import timedelta

from django.db import models
from django.utils import timezone

from accounts.models.user import User


def otp_expiry():
    return timezone.now() + timedelta(minutes=10)


class OTP(models.Model):

    VERIFY_EMAIL = "VERIFY_EMAIL"
    RESET_PASSWORD = "RESET_PASSWORD"

    PURPOSE_CHOICES = [
        (VERIFY_EMAIL, "Verify Email"),
        (RESET_PASSWORD, "Reset Password"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="otps",
    )

    purpose = models.CharField(
        max_length=20,
        choices=PURPOSE_CHOICES,
    )

    code = models.CharField(max_length=6)

    is_used = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    expires_at = models.DateTimeField(default=otp_expiry)

    def __str__(self):
        return f"{self.user.username} - {self.code}"

VERIFY_EMAIL = "VERIFY_EMAIL"
RESET_PASSWORD = "RESET_PASSWORD"

PURPOSE_CHOICES = [
    (VERIFY_EMAIL, "Verify Email"),
    (RESET_PASSWORD, "Reset Password"),
]

purpose = models.CharField(
    max_length=20,
    choices=PURPOSE_CHOICES,
    default=VERIFY_EMAIL,
)