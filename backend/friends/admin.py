from django.contrib import admin

from friends.models import FriendRequest


@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "sender",
        "receiver",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "sender__username",
        "receiver__username",
        "sender__email",
        "receiver__email",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "created_at",
    )