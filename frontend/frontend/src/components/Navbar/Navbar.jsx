import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getProfile } from "../../services/profileService";
import { useNotification } from "../../context/NotificationContext";
import {
    FaFacebook,
    FaHome,
    FaUserFriends,
    FaUsers,
    FaBell,
    FaFacebookMessenger,
    FaSearch,
    FaChevronDown,
    FaUserCircle,
    FaCog,
    FaMoon,
    FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {
    const navigate = useNavigate();
    const { notificationCount } = useNotification();

    const [profile, setProfile] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [search, setSearch] = useState("");
    const [messageCount] = useState(2);

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

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <nav className="navbar">
            {/* ==========================
                    LEFT
            ========================== */}
            <div className="navbar-left">
                <Link to="/home" className="facebook-logo">
                    <FaFacebook />
                </Link>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search Facebook"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* ==========================
                    CENTER
            ========================== */}
            <div
                className={
                    mobileMenu
                        ? "navbar-center active"
                        : "navbar-center"
                }
            >
                {/* Home */}
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        isActive ? "nav-item active-nav" : "nav-item"
                    }
                    title="Home"
                >
                    <FaHome />
                </NavLink>

                {/* Friends */}
                <NavLink
                    to="/friends"
                    className={({ isActive }) =>
                        isActive ? "nav-item active-nav" : "nav-item"
                    }
                    title="Friends"
                >
                    <FaUserFriends />
                </NavLink>

                {/* Find Friends */}
                <NavLink
                    to="/people"
                    className={({ isActive }) =>
                        isActive ? "nav-item active-nav" : "nav-item"
                    }
                    title="Find Friends"
                >
                    <FaUsers />
                </NavLink>

                {/* Friend Requests */}
                <NavLink
                    to="/friend-requests"
                    className={({ isActive }) =>
                        isActive ? "nav-item active-nav" : "nav-item"
                    }
                    title="Friend Requests"
                >
                    🤝
                </NavLink>
            </div>

            {/* ==========================
                    RIGHT
            ========================== */}
            <div className="navbar-right">
                {/* Messenger */}
                <button className="circle-btn" title="Messenger">
                    <FaFacebookMessenger />
                    {messageCount > 0 && (
                        <span className="badge">{messageCount}</span>
                    )}
                </button>

                {/* Notifications */}
                <Link
                    to="/notifications"
                    className="circle-btn"
                    title="Notifications"
                >
                    <FaBell />
                    {notificationCount > 0 && (
                        <span className="badge">{notificationCount}</span>
                    )}
                </Link>

                {/* Profile */}
                <div className="profile-menu">
                    <button
                        className="profile-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {profile?.profile_picture ? (
                            <img
                                src={profile.profile_picture}
                                alt="Profile"
                                className="profile-image"
                            />
                        ) : (
                            <div className="profile-placeholder">
                                {profile?.username
                                    ? profile.username[0].toUpperCase()
                                    : "U"}
                            </div>
                        )}
                        <span className="profile-name">
                            {profile?.username || "User"}
                        </span>
                        <FaChevronDown className="dropdown-icon" />
                    </button>

                    {menuOpen && (
                        <div className="dropdown">
                            <Link
                                to="/profile"
                                className="dropdown-item"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaUserCircle />
                                <span>My Profile</span>
                            </Link>
                            <Link
                                to="/settings"
                                className="dropdown-item"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaCog />
                                <span>Settings</span>
                            </Link>
                            <button
                                className="dropdown-item"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaMoon />
                                <span>Dark Mode</span>
                            </button>
                            <hr />
                            <button
                                className="dropdown-item logout"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}