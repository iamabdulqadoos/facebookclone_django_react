import "./Sidebar.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProfile } from "../../services/profileService";

import {
    FaUserFriends,
    FaUsers,
    FaBookmark,
    FaChevronDown,
} from "react-icons/fa";

import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";

function Sidebar() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data);
        } catch (error) {
            console.error(error);
        }
    };

    const profileImage = profile?.profile_picture
        ? profile.profile_picture.startsWith("http")
            ? profile.profile_picture
            : `http://127.0.0.1:8000${profile.profile_picture}`
        : "http://127.0.0.1:8000/media/default/default_profile.png";

    const fullName =
        `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() ||
        profile?.username ||
        "User";

    return (
        <div className="sidebar">

            {/* Profile */}
            <Link
                to="/profile"
                className="sidebar-item profile-sidebar-item"
            >
                <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-img"
                />

                <span>{fullName}</span>
            </Link>

            {/* Friends */}
            <div className="sidebar-item">
                <FaUserFriends />
                <span>Friends</span>
            </div>

            {/* Groups */}
            <div className="sidebar-item">
                <FaUsers />
                <span>Groups</span>
            </div>

            {/* Watch */}
            <div className="sidebar-item">
                <MdOutlineOndemandVideo />
                <span>Watch</span>
            </div>

            {/* Saved */}
            <div className="sidebar-item">
                <FaBookmark />
                <span>Saved</span>
            </div>

            {/* Memories */}
            <div className="sidebar-item">
                <BsClockHistory />
                <span>Memories</span>
            </div>

            {/* See More */}
            <div className="sidebar-item">
                <FaChevronDown />
                <span>See More</span>
            </div>

        </div>
    );
}

export default Sidebar;