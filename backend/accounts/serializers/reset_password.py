from rest_framework import serializers

from accounts.models import User


class ResetPasswordSerializer(serializers.Serializer):

    email = serializers.EmailField()

    password = serializers.CharField(
        min_length=8,
        write_only=True,
    )

    confirm_password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:

            raise serializers.ValidationError(
                "Passwords do not match."
            )

        return attrs

    def save(self):

        user = User.objects.get(
            email=self.validated_data["email"]
        )

        user.set_password(
            self.validated_data["password"]
        )

        user.save()

        return user