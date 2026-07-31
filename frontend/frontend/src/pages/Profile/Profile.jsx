import "./Profile.css";
import { useEffect, useState, useRef } from "react";

import EditProfile from "./EditProfile";
import coverPlaceholder from "../../assets/cover-placeholder.png";
import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import {
    getProfile,
    uploadProfilePicture,
    uploadCoverPhoto,
} from "../../services/profileService";

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);

    const profileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const fetchProfile = async () => {

        try {

            const data = await getProfile();

            setProfile(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProfile();

    }, []);

    const handleProfilePicture = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append(
            "profile_picture",
            file
        );

        try {

            await uploadProfilePicture(formData);

            fetchProfile();

        } catch (error) {

            console.error(error);

        }

    };

    const handleCoverPhoto = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append(
            "cover_photo",
            file
        );

        try {

            await uploadCoverPhoto(formData);

            fetchProfile();

        } catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (
            <h2 className="loading">
                Loading Profile...
            </h2>
        );

    }

    return (

        <div className="profile-page">

            {/* =======================
                Cover Photo
            ======================== */}

            <div className="cover-container">

                <img
    src={
        profile.cover_photo
            ? `http://127.0.0.1:8000${profile.cover_photo}`
            : coverPlaceholder
    }
    alt="Cover"
    className="cover-photo"
/>

                <button
                    className="cover-upload-btn"
                    onClick={() =>
                        coverInputRef.current.click()
                    }
                >
                    📷 Edit Cover Photo
                </button>

                <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={coverInputRef}
                    onChange={handleCoverPhoto}
                />

            </div>

            {/* =======================
                Profile Header
            ======================== */}

            <div className="profile-info">

                <div className="profile-picture-wrapper">

                    <img
    src={
        profile.profile_picture
            ? `http://127.0.0.1:8000${profile.profile_picture}`
            : avatarPlaceholder
    }
    alt="Profile"
    className="profile-picture"
/>

                    <button
                        className="profile-upload-btn"
                        onClick={() =>
                            profileInputRef.current.click()
                        }
                    >
                        📷
                    </button>

                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        ref={profileInputRef}
                        onChange={handleProfilePicture}
                    />

                </div>

                <h2>

                    {profile.first_name || profile.username}{" "}
                    {profile.last_name}

                </h2>

                <p className="username">
                    @{profile.username}
                </p>
                <div className="profile-buttons">

                    <button
                        className="edit-btn"
                        onClick={() =>
                            setShowEdit(true)
                        }
                    >
                        ✏ Edit Profile
                    </button>

                    <button className="message-btn">
                        💬 Message
                    </button>

                </div>

                <div className="profile-tabs">

                    <button className="active">
                        Posts
                    </button>

                    <button>
                        About
                    </button>

                    <button>
                        Friends
                    </button>

                    <button>
                        Photos
                    </button>

                </div>

            </div>

            {/* =======================
                Main Content
            ======================== */}

            <div className="profile-content">

                {/* Left Sidebar */}

                <div className="left-column">

                                {/* Intro */}

                    <div className="intro-card">

                        <h3>Intro</h3>

                        <p>

                            {profile.bio || "No bio added yet."}

                        </p>

                    </div>

                    {/* About */}

                    <div className="about-card">

                        <h3>About</h3>

                        <p>
                            📞 {profile.phone || "Not Added"}
                        </p>

                        <p>
                            🎂 {profile.date_of_birth || "Not Added"}
                        </p>

                        <p>
                            👤 {profile.gender || "Not Added"}
                        </p>

                        <p>
                            📍 {profile.city || "Not Added"}
                        </p>

                        <p>
                            🌍 {profile.country || "Not Added"}
                        </p>

                        <p>
                            💼 {profile.workplace || "Not Added"}
                        </p>

                        <p>
                            🎓 {profile.education || "Not Added"}
                        </p>

                        <p>
                            ❤️ {profile.relationship_status || "Not Added"}
                        </p>

                        <p>
                            🌐 {profile.website || "Not Added"}
                        </p>

                    </div>

                    {/* Friends */}

                    <div className="friends-card">

                        <h3>Friends</h3>

                        <div className="friends-grid">

                            {[1,2,3,4,5,6].map((friend) => (

                                <div
                                    key={friend}
                                    className="friend-item"
                                >

                                    <img
                                        src={`https://picsum.photos/20${friend}`}
                                        alt="Friend"
                                    />

                                    <p>

                                        Friend {friend}

                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Photos */}

                    <div className="photos-card">

                        <h3>Photos</h3>

                        <div className="photos-grid">

                            {[1,2,3,4,5,6].map((photo) => (

                                <img
                                    key={photo}
                                    src={`https://picsum.photos/30${photo}`}
                                    alt="Photo"
                                />

                            ))}

                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="right-column">

                    <div className="posts-card">

                        <h3>Posts</h3>

                                                        <div className="post-card">

                            <div className="post-header">

                                <img
                                    src={
    profile.profile_picture
        ? `http://127.0.0.1:8000${profile.profile_picture}`
        : "https://via.placeholder.com/180"
}
                                    alt="Profile"
                                />

                                <div>

                                    <h4>

                                        {profile.first_name || profile.username}

                                    </h4>

                                    <span>

                                        Just now · 🌍

                                    </span>

                                </div>

                            </div>

                            <div className="post-content">

                                Welcome to my Facebook Clone Profile! 🎉

                            </div>

                            <img
                                className="post-image"
                                src="https://picsum.photos/900/450"
                                alt="Post"
                            />

                        </div>

                    </div>

                </div>

            </div>

            {showEdit && (

                <EditProfile

                    profile={profile}

                    onClose={() => setShowEdit(false)}

                    onUpdate={fetchProfile}

                />

            )}

        </div>

    );

}