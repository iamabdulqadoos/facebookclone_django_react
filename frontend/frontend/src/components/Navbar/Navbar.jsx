import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");

    };

    return (

        <nav className="navbar">

            {/* ==========================
                LEFT SECTION
            ========================== */}

            <div className="navbar-left">

                <Link
                    to="/home"
                    className="facebook-logo"
                >
                    f
                </Link>

                <div className="search-container">

                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Search Facebook"
                    />

                </div>

            </div>



            {/* ==========================
                CENTER SECTION
            ========================== */}

            <div className="navbar-center">

                <Link
                    to="/home"
                    className="nav-item"
                    title="Home"
                >
                    🏠
                </Link>

                <Link
                    to="/friends"
                    className="nav-item"
                    title="Friends"
                >
                    👥
                </Link>

                <Link
                    to="/people"
                    className="nav-item"
                    title="Find Friends"
                >
                    ➕
                </Link>

                <Link
                    to="/friend-requests"
                    className="nav-item"
                    title="Friend Requests"
                >
                    🤝
                </Link>

            </div>



            {/* ==========================
                RIGHT SECTION
            ========================== */}

            <div className="navbar-right">

                {/* Messenger */}

                <button
                    className="circle-btn"
                    title="Messenger"
                >
                    💬
                </button>


                {/* Notifications */}

                <Link
                    to="/notifications"
                    className="circle-btn"
                    title="Notifications"
                >
                    🔔
                </Link>


                {/* Profile */}

                <div
                    className="profile-menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >

                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="profile-image"
                    />

                    {

                        menuOpen && (

                            <div className="dropdown">

                                <Link to="/profile">
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            </div>

                        )

                    }

                </div>

            </div>

        </nav>

    );

}