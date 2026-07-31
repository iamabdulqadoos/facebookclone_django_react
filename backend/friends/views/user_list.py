from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from accounts.serializers.user_list import UserListSerializer


class UserListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        users = User.objects.exclude(id=request.user.id)

        serializer = UserListSerializer(users, many=True)

        return Response(serializer.data)