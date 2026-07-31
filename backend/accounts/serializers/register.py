from rest_framework import serializers

from accounts.models import User, OTP
from accounts.services.email import (
    generate_otp,
    send_otp_email_async,
)


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
        )

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username already exists."
            )
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )
        return value

    def create(self, validated_data):

        user = User.objects.create_user(
            **validated_data
        )

        user.is_active = False
        user.save()

        # Mark any previous unused verification OTPs as used
        OTP.objects.filter(
            user=user,
            purpose=OTP.VERIFY_EMAIL,
            is_used=False,
        ).update(is_used=True)

        code = generate_otp()

        OTP.objects.create(
            user=user,
            purpose=OTP.VERIFY_EMAIL,
            code=code,
        )

        send_otp_email_async(
            email=user.email,
            otp=code,
            subject="Facebook Clone - Email Verification",
            purpose="verification",
        )

        return user