from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from friends.models import FriendRequest
from friends.serializers import FriendRequestSerializer

from accounts.models import User

from notifications.utils import create_notification
from notifications.models import Notification


class SendFriendRequestView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):

        try:
            receiver = User.objects.get(id=user_id)

        except User.DoesNotExist:

            return Response(
                {
                    "error": "User not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Prevent sending request to yourself
        if receiver == request.user:

            return Response(
                {
                    "error": "You cannot send a friend request to yourself."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Prevent duplicate friend requests
        if FriendRequest.objects.filter(
            sender=request.user,
            receiver=receiver
        ).exists():

            return Response(
                {
                    "error": "Friend request already sent."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = FriendRequestSerializer(
            data={
                "receiver": receiver.id
            },
            context={
                "request": request
            }
        )

        serializer.is_valid(raise_exception=True)

        friend_request = serializer.save(
            sender=request.user
        )

        create_notification(
            sender=request.user,
            receiver=receiver,
            notification_type=Notification.FRIEND_REQUEST,
            message=f"{request.user.username} sent you a friend request."
        )

        return Response(
            FriendRequestSerializer(friend_request).data,
            status=status.HTTP_201_CREATED
        )

class IncomingFriendRequestsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        requests = FriendRequest.objects.filter(
            receiver=request.user,
            status=FriendRequest.PENDING
        )

        serializer = FriendRequestSerializer(
            requests,
            many=True
        )

        return Response(serializer.data)


class SentFriendRequestsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        requests = FriendRequest.objects.filter(
            sender=request.user,
            status=FriendRequest.PENDING
        )

        serializer = FriendRequestSerializer(
            requests,
            many=True
        )

        return Response(serializer.data)


class AcceptFriendRequestView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):

        try:

            friend_request = FriendRequest.objects.get(
                id=request_id,
                receiver=request.user,
                status=FriendRequest.PENDING
            )

        except FriendRequest.DoesNotExist:

            return Response(
                {
                    "error": "Friend request not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        friend_request.status = FriendRequest.ACCEPTED

        friend_request.save()

        request.user.friends.add(
            friend_request.sender
        )

        create_notification(
            sender=request.user,
            receiver=friend_request.sender,
            notification_type=Notification.FRIEND_ACCEPTED,
            message=f"{request.user.username} accepted your friend request."
        )

        return Response(
            {
                "message": "Friend request accepted successfully."
            }
        )


class RejectFriendRequestView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):

        try:

            friend_request = FriendRequest.objects.get(
                id=request_id,
                receiver=request.user,
                status=FriendRequest.PENDING
            )

        except FriendRequest.DoesNotExist:

            return Response(
                {
                    "error": "Friend request not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        friend_request.status = FriendRequest.REJECTED

        friend_request.save()

        create_notification(
            sender=request.user,
            receiver=friend_request.sender,
            notification_type=Notification.FRIEND_REJECTED,
            message=f"{request.user.username} rejected your friend request."
        )

        return Response(
            {
                "message": "Friend request rejected."
            }
        )


class CancelFriendRequestView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, request_id):

        try:

            friend_request = FriendRequest.objects.get(
                id=request_id,
                sender=request.user,
                status=FriendRequest.PENDING
            )

        except FriendRequest.DoesNotExist:

            return Response(
                {
                    "error": "Friend request not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        friend_request.delete()

        return Response(
            {
                "message": "Friend request cancelled."
            }
        )