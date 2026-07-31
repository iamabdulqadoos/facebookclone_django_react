import { useEffect, useState } from "react";

import {
    getFriendStatus,
    sendFriendRequest,
    acceptFriendRequest,
} from "../../services/friendService";

export default function FriendButton({ userId }) {

    const [status, setStatus] = useState("");
    const [requestId, setRequestId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadStatus();

    }, [userId]);

    const loadStatus = async () => {

        try {

            const data = await getFriendStatus(userId);

            setStatus(data.status);

            if (data.request_id) {

                setRequestId(data.request_id);

            }

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleAddFriend = async () => {

        try {

            await sendFriendRequest(userId);

            setStatus("pending_sent");

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleAccept = async () => {

        try {

            await acceptFriendRequest(requestId);

            setStatus("friends");

        }

        catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (
            <button disabled>

                Loading...

            </button>
        );

    }

    switch (status) {

        case "self":

            return null;

        case "friends":

            return (

                <button className="friends-btn">

                    ✓ Friends

                </button>

            );

        case "pending_sent":

            return (

                <button
                    className="pending-btn"
                    disabled
                >

                    Request Sent

                </button>

            );

        case "pending_received":

            return (

                <button
                    className="accept-btn"
                    onClick={handleAccept}
                >

                    Accept Request

                </button>

            );

        default:

            return (

                <button
                    className="add-friend-btn"
                    onClick={handleAddFriend}
                >

                    + Add Friend

                </button>

            );

    }

}