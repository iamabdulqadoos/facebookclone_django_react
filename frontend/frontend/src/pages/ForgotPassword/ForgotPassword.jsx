
import "./ForgotPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await forgotPassword({
                email,
            });

            setSuccess(response.message);

            navigate("/verify-reset-otp", {
                state: {
                    email,
                },
            });

        } catch (err) {

            if (err.response?.data) {

                const data = err.response.data;

                if (typeof data === "object") {
                    const firstError = Object.values(data)[0];
                    setError(
                        Array.isArray(firstError)
                            ? firstError[0]
                            : firstError
                    );
                } else {
                    setError("Something went wrong.");
                }

            } else {
                setError("Server error.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <h2>Forgot Password</h2>

                <p>
                    Enter your registered email address.
                </p>

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
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Sending OTP..."
                        : "Send OTP"}
                </button>

            </form>

        </div>
    );
}

export default ForgotPassword;