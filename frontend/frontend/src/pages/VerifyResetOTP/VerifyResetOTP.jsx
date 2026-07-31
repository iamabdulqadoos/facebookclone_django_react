import "./VerifyResetOTP.css";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyResetOTP } from "../../api/auth";

export default function VerifyResetOTP() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, "");

        if (!value) {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

        if (index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pasted) return;

        const newOtp = [...otp];

        pasted.split("").forEach((digit, i) => {
            newOtp[i] = digit;
        });

        setOtp(newOtp);

        inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await verifyResetOTP({
                email,
                code: otp.join(""),
            });

            navigate("/reset-password", {
                state: { email },
            });
        } catch (err) {
            if (err.response?.data) {
                const firstError = Object.values(err.response.data)[0];

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
        <div className="verify-page">
            <div className="verify-card">

                <div className="verify-logo">
                    facebook
                </div>

                <h2>Verify Reset OTP</h2>

                <p>
                    Enter the 6-digit verification code sent to
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

                    <div className="otp-container">

                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="otp-input"
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleChange(e, index)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                onPaste={handlePaste}
                                required
                            />
                        ))}

                    </div>

                    <button
                        className="verify-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify OTP"}
                    </button>

                </form>

            </div>
        </div>
    );
}