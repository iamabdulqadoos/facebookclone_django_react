import os
import django

# Load Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.core.mail import send_mail
from django.conf import settings

try:
    send_mail(
        subject="Facebook Clone Test",
        message="Congratulations! Gmail SMTP is working successfully.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=["abdulqadooscr@gmail.com"],  # Your email address
        fail_silently=False,
    )

    print("✅ Email sent successfully!")

except Exception as e:
    print("❌ Error:")
    print(type(e).__name__)
    print(e)