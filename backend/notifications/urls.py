from django.urls import path

from notifications.views.notification import (
    NotificationListView,
    UnreadNotificationCountView,
    MarkAllNotificationsReadView,
)

from notifications.views.mark_as_read import (
    MarkNotificationReadView,
)

urlpatterns = [

    # Get all notifications
    path(
        "",
        NotificationListView.as_view(),
        name="notification-list",
    ),

    # Get unread notification count
    path(
        "unread-count/",
        UnreadNotificationCountView.as_view(),
        name="notification-unread-count",
    ),

    # Mark one notification as read
    path(
        "read/<int:notification_id>/",
        MarkNotificationReadView.as_view(),
        name="notification-read",
    ),

    # Mark all notifications as read
    path(
        "read-all/",
        MarkAllNotificationsReadView.as_view(),
        name="notification-read-all",
    ),

]