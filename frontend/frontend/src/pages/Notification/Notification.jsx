import { useEffect, useState } from "react";

import {
    getNotifications,
    markNotificationAsRead,
} from "../../services/notificationService";

import "./Notification.css";

function Notification() {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchNotifications();

    }, []);

    const fetchNotifications = async () => {

        try {

            const data = await getNotifications();

            if (Array.isArray(data)) {

                setNotifications(data);

            }

            else if (Array.isArray(data.results)) {

                setNotifications(data.results);

            }

            else {

                setNotifications([]);

            }

        }

        catch (error) {

            console.error(error);

            setNotifications([]);

        }

        finally {

            setLoading(false);

        }

    };
    const handleNotificationClick = async (notificationId) => {

    try {

        await markNotificationAsRead(notificationId);

        setNotifications((previousNotifications) =>

            previousNotifications.map((notification) =>

                notification.id === notificationId

                    ? {
                        ...notification,
                        is_read: true,
                    }

                    : notification

            )

        );

    }

    catch (error) {

        console.error(
            "Unable to mark notification as read.",
            error
        );

    }

};
if (loading) {

    return (

        <div className="notification-page">

            <h2>Loading Notifications...</h2>

        </div>

    );

}

return (

    <div className="notification-page">

        <h2>Notifications</h2>

        {

            notifications.length === 0 ? (

                <p>No notifications yet.</p>

            ) : (

                notifications.map((notification) => (

                    <div
                        key={notification.id}
                        className={
                            notification.is_read
                                ? "notification-card read"
                                : "notification-card unread"
                        }
                        onClick={() =>
                            handleNotificationClick(notification.id)
                        }
                    >

                        <div className="notification-content">

                            <h4>

                                {notification.sender_username}

                            </h4>

                            <p>

                                {notification.message}

                            </p>

                            <small>

                                {

                                    new Date(
                                        notification.created_at
                                    ).toLocaleString()

                                }

                            </small>

                        </div>

                        {

                            !notification.is_read && (

                                <div className="unread-dot"></div>

                            )

                        }

                    </div>

                ))

            )

        }

    </div>

);

}

export default Notification;