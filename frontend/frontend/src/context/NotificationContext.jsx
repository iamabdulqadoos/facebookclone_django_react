import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getUnreadNotificationCount,
} from "../services/notificationService";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notificationCount, setNotificationCount] = useState(0);

    const fetchNotificationCount = async () => {

        try {

            const data = await getUnreadNotificationCount();

            setNotificationCount(data.count);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchNotificationCount();

    }, []);

    return (

        <NotificationContext.Provider
            value={{
                notificationCount,
                setNotificationCount,
                fetchNotificationCount,
            }}
        >

            {children}

        </NotificationContext.Provider>

    );

};

export const useNotification = () => {

    return useContext(NotificationContext);

};