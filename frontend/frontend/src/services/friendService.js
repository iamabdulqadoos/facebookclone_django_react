import api from "../api/axios";

// ==========================
// Send Friend Request
// ==========================
export const sendFriendRequest = async (userId) => {

    const response = await api.post(
        `/friends/request/${userId}/`
    );

    return response.data;

};

// ==========================
// Incoming Friend Requests
// ==========================
export const getIncomingRequests = async () => {

    const response = await api.get(
        "/friends/requests/"
    );

    return response.data;

};

// ==========================
// Sent Friend Requests
// ==========================
export const getSentRequests = async () => {

    const response = await api.get(
        "/friends/sent/"
    );

    return response.data;

};

// ==========================
// Accept Request
// ==========================
export const acceptFriendRequest = async (requestId) => {

    const response = await api.post(
        `/friends/accept/${requestId}/`
    );

    return response.data;

};

// ==========================
// Reject Request
// ==========================
export const rejectFriendRequest = async (requestId) => {

    const response = await api.post(
        `/friends/reject/${requestId}/`
    );

    return response.data;

};

// ==========================
// Cancel Request
// ==========================
export const cancelFriendRequest = async (requestId) => {

    const response = await api.delete(
        `/friends/cancel/${requestId}/`
    );

    return response.data;

};

// ==========================
// Friend List
// ==========================
export const getFriends = async () => {

    const response = await api.get(
        "/friends/list/"
    );

    return response.data;

};

// ==========================
// Remove Friend
// ==========================
export const removeFriend = async (userId) => {

    const response = await api.delete(
        `/friends/remove/${userId}/`
    );

    return response.data;

};

// ==========================
// Friend Status
// ==========================
export const getFriendStatus = async (userId) => {

    const response = await api.get(
        `/friends/status/${userId}/`
    );

    return response.data;

};
// ==========================
// Get All Users
// ==========================

export const getUsers = async () => {

    const response = await api.get(
        "/accounts/users/"
    );

    return response.data;

};