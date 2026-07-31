from notifications.models import Notification


def create_notification(
    sender,
    receiver,
    notification_type,
    message,
):
    if sender == receiver:
        return

    Notification.objects.create(
        sender=sender,
        receiver=receiver,
        notification_type=notification_type,
        message=message,
    )