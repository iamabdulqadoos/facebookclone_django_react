import { useEffect, useState } from "react";
import "./People.css";

import {
    getUsers,
    getFriendStatus,
    sendFriendRequest,
} from "../../services/friendService";

export default function People() {

    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState({});

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {

            const data = await getUsers();

            setUsers(data);

            const statuses = {};

            for (const user of data) {

                const response = await getFriendStatus(user.id);

                statuses[user.id] = response.status;

            }

            setStatus(statuses);

        } catch (error) {

            console.error(error);

        }
    };

    const handleSendRequest = async (userId) => {

        try {

            await sendFriendRequest(userId);

            setStatus((prev) => ({
                ...prev,
                [userId]: "pending_sent",
            }));

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="people-page">

            <h2>People You May Know</h2>

            {users.length === 0 ? (

                <div className="empty">

                    <h3>No Users Found</h3>

                </div>

            ) : (

                <div className="people-container">

                    {users.map((user) => (

                        <div
                            key={user.id}
                            className="people-card"
                        >

                            <img
                                src={
                                    user.profile_picture
                                        ? `http://127.0.0.1:8000${user.profile_picture}`
                                        : "https://via.placeholder.com/120"
                                }
                                alt={user.username}
                            />

                            <h3>{user.username}</h3>

                            <p>{user.email}</p>

                            {status[user.id] === "none" && (

                                <button
                                    className="add-btn"
                                    onClick={() => handleSendRequest(user.id)}
                                >
                                    Add Friend
                                </button>

                            )}

                            {status[user.id] === "pending_sent" && (

                                <button
                                    className="pending-btn"
                                    disabled
                                >
                                    Request Sent
                                </button>

                            )}

                            {status[user.id] === "friends" && (

                                <button
                                    className="friend-btn"
                                    disabled
                                >
                                    Friends
                                </button>

                            )}

                            {status[user.id] === "pending_received" && (

                                <button
                                    className="respond-btn"
                                    disabled
                                >
                                    Respond
                                </button>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}