from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q

from accounts.models import User


class UserSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        query = request.GET.get("q")

        if not query:
            return Response([])

        users = User.objects.filter(
            Q(username__icontains=query) |
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query)
        ).exclude(id=request.user.id)

        data = []

        for user in users:
            data.append({
                "id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "profile_picture": user.profile_picture.url if user.profile_picture else None,
            })

        return Response(data)