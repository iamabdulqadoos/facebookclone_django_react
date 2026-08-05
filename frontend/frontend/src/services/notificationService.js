import api from "../api/axios";

// ==========================================
// Get All Notifications
// ==========================================

export const getNotifications = async () => {

    const response = await api.get(
        "/notifications/"
    );

    return response.data;

};

// ==========================================
// Mark Single Notification Read
// ==========================================

export const markNotificationAsRead = async (
    notificationId
) => {

    const response = await api.post(
        `/notifications/read/${notificationId}/`
    );

    return response.data;

};

// ==========================================
// Get Unread Notification Count
// ==========================================

export const getUnreadNotificationCount = async () => {

    const response = await api.get(
        "/notifications/unread-count/"
    );

    return response.data;

};

// ==========================================
// Mark All Notifications Read
// ==========================================

export const markAllNotificationsRead = async () => {

    const response = await api.post(
        "/notifications/read-all/"
    );

    return response.data;

};