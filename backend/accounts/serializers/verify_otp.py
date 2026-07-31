from django.utils import timezone

from rest_framework import serializers

from accounts.models import User, OTP


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def validate(self, attrs):
        email = attrs.get("email")
        code = attrs.get("code")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "User not found."
            )

        try:
            otp = OTP.objects.filter(
                user=user,
                purpose=OTP.VERIFY_EMAIL,
                is_used=False,
            ).latest("created_at")
        except OTP.DoesNotExist:
            raise serializers.ValidationError(
                "OTP not found."
            )

        if otp.expires_at < timezone.now():
            raise serializers.ValidationError(
                "OTP has expired."
            )

        if otp.code != code:
            raise serializers.ValidationError(
                "Invalid OTP."
            )

        attrs["user"] = user
        attrs["otp"] = otp

        return attrs