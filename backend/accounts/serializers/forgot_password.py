import random

from rest_framework import serializers

from accounts.models import User, OTP
from accounts.services.email import (
    generate_otp,
    send_otp_email_async,
)


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("No account found with this email.")

        self.user = user
        return value

    def save(self):
        # Mark previous reset OTPs as used
        OTP.objects.filter(
            user=self.user,
            purpose=OTP.RESET_PASSWORD,
            is_used=False,
        ).update(is_used=True)

        code = f"{random.randint(100000, 999999)}"

        otp = OTP.objects.create(
            user=self.user,
            purpose=OTP.RESET_PASSWORD,
            code=code,
        )

        send_otp_email_async(
            self.user.email,
            code,
            "Password Reset OTP"
        )

        return otp