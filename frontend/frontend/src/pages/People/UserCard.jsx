import { Link } from "react-router-dom";

import FriendButton from "../../components/FriendButton/FriendButton";

export default function UserCard({ user }) {

    return (

        <div className="user-card">

            <img

                className="user-image"

                src={
                    user.profile_picture
                        ? `http://127.0.0.1:8000${user.profile_picture}`
                        : "https://ui-avatars.com/api/?name=" + user.username
                }

                alt={user.username}

            />

            <h3>

                {user.first_name || user.username} {user.last_name}

            </h3>

            <p>

                @{user.username}

            </p>

            <p>

                {user.bio || "No bio added yet."}

            </p>

            <p>

                📍 {user.city || "Unknown"}, {user.country || ""}

            </p>

            <FriendButton

                userId={user.id}

            />

            <Link

                to={`/profile/${user.id}`}

                className="view-profile-btn"

            >

                View Profile

            </Link>

        </div>

    );

}