import api from "../api/axios";

// Get all notifications
export const getNotifications = async () => {
    const response = await api.get("/notifications/");
    return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
    const response = await api.post(
        `/notifications/read/${notificationId}/`
    );

    return response.data;
};