from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

# Authentication Views
from accounts.views.register import RegisterView
from accounts.views.login import LoginView
from accounts.views.logout import LogoutView
from accounts.views.verify_otp import VerifyOTPView
from accounts.views.forgot_password import ForgotPasswordView
from accounts.views.verify_reset_otp import VerifyResetOTPView
from accounts.views.reset_password import ResetPasswordView
# Other Views
from accounts.views.users import UserListView
from accounts.views.profile import UserProfileView
from accounts.views.search import UserSearchView

from accounts.views.profile import (
    UserProfileView,
    UploadProfilePictureView,
    UploadCoverPhotoView
)

urlpatterns = [

    # Authentication
    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),

    path(
        "verify-otp/",
        VerifyOTPView.as_view(),
        name="verify-otp",
    ),
    path(
        "verify-reset-otp/",
        VerifyResetOTPView.as_view(),
    name="verify-reset-otp",
    ),
    path(
    "users/",
    UserListView.as_view(),
    name="user_list",
    ),
    path(
        "reset-password/",
        ResetPasswordView.as_view(),
        name="reset-password",
    ),
    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),

    path(
        "logout/",
        LogoutView.as_view(),
        name="logout",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    # Profile
    path(
        "profile/",
        UserProfileView.as_view(),
        name="profile",
    ),

    path(
        "profile/<int:user_id>/",
        UserProfileView.as_view(),
        name="user-profile",
    ),

  path(
        "profile/",
        UserProfileView.as_view()
    ),


    path(
        "profile-picture/",
        UploadProfilePictureView.as_view()
    ),


    path(
        "cover-photo/",
        UploadCoverPhotoView.as_view()
    ),

    # Users
path(
        "users/",
        UserListView.as_view(),
        name="user-list",
    ),

path(
        "search/",
        UserSearchView.as_view(),
        name="user-search",
    ),
path(
    "forgot-password/",
    ForgotPasswordView.as_view(),
    name="forgot-password",
),
]