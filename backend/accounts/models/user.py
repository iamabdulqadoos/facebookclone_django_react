from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    friends = models.ManyToManyField(
        "self",
        symmetrical=True,
        blank=True
    )

    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True
    )

    cover_photo = models.ImageField(
        upload_to="cover_photos/",
        blank=True,
        null=True
    )

    bio = models.TextField(blank=True)

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    date_of_birth = models.DateField(
        blank=True,
        null=True
    )

    gender = models.CharField(
        max_length=20,
        blank=True
    )

    city = models.CharField(
        max_length=100,
        blank=True
    )

    country = models.CharField(
        max_length=100,
        blank=True
    )

    workplace = models.CharField(
        max_length=150,
        blank=True
    )

    education = models.CharField(
        max_length=150,
        blank=True
    )

    relationship_status = models.CharField(
        max_length=100,
        blank=True
    )

    website = models.URLField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )