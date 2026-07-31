from django.urls import path

from notifications.views.notification import NotificationListView
from notifications.views.mark_as_read import MarkNotificationReadView

urlpatterns = [
    path(
        "",
        NotificationListView.as_view(),
        name="notification-list",
    ),

    path(
        "read/<int:notification_id>/",
        MarkNotificationReadView.as_view(),
        name="notification-read",
    ),
]