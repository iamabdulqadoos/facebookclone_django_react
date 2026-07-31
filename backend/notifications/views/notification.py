from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from notifications.models import Notification
from notifications.serializers.notification import NotificationSerializer


class NotificationListView(generics.ListAPIView):

    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(
            receiver=self.request.user
        ).order_by("-created_at")