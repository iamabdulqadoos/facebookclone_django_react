from django.db.models.signals import post_save
from django.dispatch import receiver

from friends.models import FriendRequest
from notifications.models import Notification


@receiver(post_save, sender=FriendRequest)
def create_friend_request_notification(sender, instance, created, **kwargs):

    print("FriendRequest Signal Triggered!")
    # Run only when a new friend request is created
    if created:

        Notification.objects.create(
            sender=instance.sender,
            receiver=instance.receiver,
            notification_type="friend_request",
            message=f"{instance.sender.username} sent you a friend request.",
        )