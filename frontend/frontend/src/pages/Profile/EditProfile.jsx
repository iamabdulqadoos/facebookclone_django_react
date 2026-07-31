import "./EditProfile.css";
import { useState } from "react";
import { updateProfile } from "../../services/profileService";

export default function EditProfile({
    profile,
    onClose,
    onUpdate,
}) {

    const [formData, setFormData] = useState({

        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        bio: profile.bio || "",
        phone: profile.phone || "",
        date_of_birth: profile.date_of_birth || "",
        gender: profile.gender || "",
        city: profile.city || "",
        country: profile.country || "",
        workplace: profile.workplace || "",
        education: profile.education || "",
        relationship_status: profile.relationship_status || "",
        website: profile.website || "",

    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await updateProfile(formData);

            onUpdate();

            onClose();

        } catch (err) {

            if (err.response?.data) {

                const firstError = Object.values(
                    err.response.data
                )[0];

                setError(
                    Array.isArray(firstError)
                        ? firstError[0]
                        : firstError
                );

            } else {

                setError("Something went wrong.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="edit-modal">

                <h2>Edit Profile</h2>

                <form onSubmit={handleSubmit}>

                    {error && (

                        <div className="error-message">
                            {error}
                        </div>

                    )}

                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />

                    <textarea
                        name="bio"
                        placeholder="Write something about yourself..."
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                    />

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="workplace"
                        placeholder="Workplace"
                        value={formData.workplace}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="education"
                        placeholder="Education"
                        value={formData.education}
                        onChange={handleChange}
                    />

                    <select
                        name="relationship_status"
                        value={formData.relationship_status}
                        onChange={handleChange}
                    >

                        <option value="">
                            Relationship Status
                        </option>

                        <option value="Single">
                            Single
                        </option>

                        <option value="In a Relationship">
                            In a Relationship
                        </option>

                        <option value="Married">
                            Married
                        </option>

                    </select>

                    <input
                        type="url"
                        name="website"
                        placeholder="Website"
                        value={formData.website}
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}