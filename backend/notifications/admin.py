from django.contrib import admin
from notifications.models import Notification

@admin.register(Notification)

class NotificationAdmin(admin.ModelAdmin):
    list_display=(
        "id",
        "sender",
        "receiver",
        "notification_type",
        "is_read",
        "created_at",
    )

    list_filter = (
        "notification_type",
        "is_read",
    )

    search_fields = (
        "sender_username",
        "receiver_username",
        "message",
    )
    ordering =(
        "-created_at",
    )
    readonly_fields = (
        "created_at",
    )
    