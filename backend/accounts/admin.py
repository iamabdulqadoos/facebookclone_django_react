from django.contrib import admin

from accounts.models import User, OTP


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "username",
        "email",
        "is_active",
        "is_staff",
        "created_at",
    )

    search_fields = (
        "username",
        "email",
    )

    list_filter = (
        "is_active",
        "is_staff",
    )


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "code",
        "is_used",
        "created_at",
        "expires_at",
    )

    search_fields = (
        "user__username",
        "user__email",
        "code",
    )

    list_filter = (
        "is_used",
    )