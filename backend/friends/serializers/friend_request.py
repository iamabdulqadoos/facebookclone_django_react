from rest_framework import serializers

from friends.models import FriendRequest
from accounts.models import User


class FriendRequestSerializer(serializers.ModelSerializer):

    sender_username = serializers.CharField(
        source="sender.username",
        read_only=True
    )

    receiver_username = serializers.CharField(
        source="receiver.username",
        read_only=True
    )

    class Meta:

        model = FriendRequest

        fields = (
            "id",
            "sender",
            "sender_username",
            "receiver",
            "receiver_username",
            "status",
            "created_at",
        )

        read_only_fields = (
            "id",
            "sender",
            "status",
            "created_at",
        )

    def validate(self, attrs):

        request = self.context["request"]

        sender = request.user

        receiver = attrs["receiver"]

        # Cannot send request to yourself
        if sender == receiver:

            raise serializers.ValidationError(
                "You cannot send a friend request to yourself."
            )

        # Already friends
        if receiver in sender.friends.all():

            raise serializers.ValidationError(
                "You are already friends."
            )

        # Request already sent
        if FriendRequest.objects.filter(
            sender=sender,
            receiver=receiver,
            status=FriendRequest.PENDING
        ).exists():

            raise serializers.ValidationError(
                "Friend request already sent."
            )

        # Receiver has already sent a request
        if FriendRequest.objects.filter(
            sender=receiver,
            receiver=sender,
            status=FriendRequest.PENDING
        ).exists():

            raise serializers.ValidationError(
                "This user has already sent you a friend request."
            )

        return attrs