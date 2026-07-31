from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import User
from friends.models import FriendRequest


class FriendListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        friends = request.user.friends.all()

        data = []

        for friend in friends:

            data.append({
                "id": friend.id,
                "username": friend.username,
                "first_name": friend.first_name,
                "last_name": friend.last_name,
                "profile_picture": (
                    friend.profile_picture.url
                    if friend.profile_picture
                    else None
                ),
            })

        return Response(data)


class RemoveFriendView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):

        try:
            friend = User.objects.get(id=user_id)

        except User.DoesNotExist:

            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if friend not in request.user.friends.all():

            return Response(
                {"error": "This user is not your friend."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        request.user.friends.remove(friend)

        return Response({
            "message": "Friend removed successfully."
        })


class FriendStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):

        if request.user.id == user_id:

            return Response({
                "status": "self"
            })

        try:

            user = User.objects.get(id=user_id)

        except User.DoesNotExist:

            return Response(
                {
                    "error": "User not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if user in request.user.friends.all():

            return Response({
                "status": "friends"
            })

        sent_request = FriendRequest.objects.filter(
            sender=request.user,
            receiver=user,
            status=FriendRequest.PENDING
        ).first()

        if sent_request:

            return Response({
                "status": "pending_sent",
                "request_id": sent_request.id
            })

        received_request = FriendRequest.objects.filter(
            sender=user,
            receiver=request.user,
            status=FriendRequest.PENDING
        ).first()

        if received_request:

            return Response({
                "status": "pending_received",
                "request_id": received_request.id
            })

        return Response({
            "status": "none"
        })