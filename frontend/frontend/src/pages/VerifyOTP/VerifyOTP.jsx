import "./VerifyOTP.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from "../../services/authService";

function VerifyOtp() {

    const navigate = useNavigate();
    const location = useLocation();

    const emailFromRegister = location.state?.email || "";

    const [formData, setFormData] = useState({
        email: emailFromRegister,
        code: "",
    });

    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const data = await verifyOTP(formData);
            console.log("OTP Verified:", data);

            setVerified(true);

        } catch (err) {
            console.log(
                "OTP Verification Error:",
                JSON.stringify(err.response?.data, null, 2)
            );

            const message =
                err.response?.data?.email?.[0] ||
                err.response?.data?.code?.[0] ||
                err.response?.data?.non_field_errors?.[0] ||
                err.response?.data?.detail ||
                "Invalid or expired code. Please try again.";

            setError(message);
        }
    };

    if (verified) {
        return (
            <div className="verify-otp-page">
                <div className="verify-otp-card">
                    <h1>Your Account is Activated</h1>
                    <p className="subtitle">
                        Your email has been verified successfully.
                    </p>
                    <button onClick={() => navigate("/login")}>
                        Login Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="verify-otp-page">
            <div className="verify-otp-card">

                <h1>
                    Verify Your Email
                </h1>

                <p className="subtitle">
                    Enter your email and the 6-digit code sent to it
                </p>

                {error && (
                    <p className="field-error">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="code"
                        placeholder="Enter 6-digit code"
                        value={formData.code}
                        onChange={handleChange}
                        maxLength={6}
                    />

                    <button type="submit">
                        Verify OTP
                    </button>

                </form>

            </div>
        </div>
    );
}

export default VerifyOtp;