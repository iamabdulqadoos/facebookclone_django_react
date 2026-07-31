import random
import threading

from django.conf import settings
from django.core.mail import send_mail


def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp_email(
    email,
    otp,
    subject="Facebook Clone - Email Verification",
    purpose="verification",
):
    if purpose == "reset_password":
        message = f"""
Hello,

We received a request to reset your Facebook Clone account password.

Your Password Reset OTP is:

{otp}

This code is valid for 10 minutes.

If you did not request a password reset, please ignore this email.
"""

    else:
        message = f"""
Hello,

Welcome to Facebook Clone!

Your verification code is:

{otp}

This code is valid for 10 minutes.

If you did not create this account, please ignore this email.
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )


def send_otp_email_async(
    email,
    otp,
    subject="Facebook Clone - Email Verification",
    purpose="verification",
):
    thread = threading.Thread(
        target=send_otp_email,
        args=(email, otp, subject, purpose),
        daemon=True,
    )
    thread.start()