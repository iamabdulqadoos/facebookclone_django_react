import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";
import "./Login.css";


export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await loginUser(formData);

            // Save JWT Tokens
            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);

            console.log("Access Token:", response.access);

            // Redirect
            navigate("/home");

        } catch (err) {

            console.log(err);

            if (err.response?.data?.non_field_errors) {
                setError(err.response.data.non_field_errors[0]);
            } else {
                setError("Invalid Username or Password");
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="login-page">

            <div className="login-left">
                <h1>facebook</h1>

                <p>
                    Facebook helps you connect and share with the people in your life.
                </p>
            </div>

            <div className="login-right">

                <form
                    className="login-card"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <p
                            style={{
                                color: "red",
                                marginBottom: "10px",
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </p>
                    )}

                    <button
                        className="login-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>

                    <Link to="/forgot-password">
                        Forgotten password?
                    </Link>

                    <hr />

                    <button
                        type="button"
                        className="create-btn"
                        onClick={() => navigate("/register")}
                    >
                        Create New Account
                    </button>

                </form>

            </div>

        </div>
    );
}