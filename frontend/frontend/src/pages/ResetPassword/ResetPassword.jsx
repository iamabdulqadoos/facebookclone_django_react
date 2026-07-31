import "./ResetPassword.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../api/auth";

export default function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);

        try {

            const response = await resetPassword({
                email,
                password: formData.password,
                confirm_password: formData.confirm_password,
            });

            setSuccess(
                response.message ||
                "Password reset successfully! Redirecting to Login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 2000);

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

        <div className="reset-page">

            <div className="reset-card">

                <div className="reset-logo">
                    facebook
                </div>

                <h2>Reset Password</h2>

                <p>
                    Create a new password for
                    <br />
                    <span className="email">
                        {email}
                    </span>
                </p>

                <form onSubmit={handleSubmit}>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            {success}
                        </div>
                    )}

                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className="reset-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Updating..."
                            : "Reset Password"}
                    </button>

                </form>

            </div>

        </div>

    );

}