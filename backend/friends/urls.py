from django.urls import path

from friends.views.friend_request import (
    SendFriendRequestView,
    IncomingFriendRequestsView,
    SentFriendRequestsView,
    AcceptFriendRequestView,
    RejectFriendRequestView,
    CancelFriendRequestView,
)

from friends.views.friend import (
    FriendListView,
    RemoveFriendView,
    FriendStatusView,
)


urlpatterns = [

    # ==========================
    # Friend Requests
    # ==========================

    path(
        "request/<int:user_id>/",
        SendFriendRequestView.as_view(),
        name="send_friend_request",
    ),

    path(
        "requests/",
        IncomingFriendRequestsView.as_view(),
        name="incoming_friend_requests",
    ),

    path(
        "sent/",
        SentFriendRequestsView.as_view(),
        name="sent_friend_requests",
    ),

    path(
        "accept/<int:request_id>/",
        AcceptFriendRequestView.as_view(),
        name="accept_friend_request",
    ),

    path(
        "reject/<int:request_id>/",
        RejectFriendRequestView.as_view(),
        name="reject_friend_request",
    ),

    path(
        "cancel/<int:request_id>/",
        CancelFriendRequestView.as_view(),
        name="cancel_friend_request",
    ),

    # ==========================
    # Friends
    # ==========================

    path(
        "list/",
        FriendListView.as_view(),
        name="friend_list",
    ),

    path(
        "remove/<int:user_id>/",
        RemoveFriendView.as_view(),
        name="remove_friend",
    ),

    path(
        "status/<int:user_id>/",
        FriendStatusView.as_view(),
        name="friend_status",
    ),

]