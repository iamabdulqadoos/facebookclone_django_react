import random
import threading

from django.conf import settings

from django.core.mail import EmailMultiAlternatives

from django.template.loader import render_to_string

from django.utils.html import strip_tags


def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp_email(
    email,
    otp,
    subject="Facebook - Email Verification",
    purpose="verification",
):

    if purpose == "reset_password":

        template = "emails/reset_password_email.html"

    else:

        template = "emails/verification_email.html"

    context = {
        "otp": otp,
    }

    html_message = render_to_string(
        template,
        context,
    )

    plain_message = strip_tags(html_message)

    email_message = EmailMultiAlternatives(
        subject=subject,
        body=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )

    email_message.attach_alternative(
        html_message,
        "text/html",
    )

    email_message.send()


def send_otp_email_async(
    email,
    otp,
    subject="Facebook - Email Verification",
    purpose="verification",
):

    thread = threading.Thread(
        target=send_otp_email,
        args=(
            email,
            otp,
            subject,
            purpose,
        ),
        daemon=True,
    )

    thread.start()