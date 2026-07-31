import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        try {
            const data = await registerUser(formData);
            console.log("Registration Success:", data);

            navigate("/verify-otp", { state: { email: formData.email } });

        } catch (error) {
            console.log(
                "Registration Error:",
                JSON.stringify(error.response?.data, null, 2)
            );

            if (error.response?.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ non_field_errors: ["Something went wrong. Please try again."] });
            }
        }
    };


    return (
        <div className="register-page">
            <div className="register-card">

                <h1>
                    Create Account
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    {errors.first_name && (
                        <p className="field-error">{errors.first_name[0]}</p>
                    )}

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    {errors.last_name && (
                        <p className="field-error">{errors.last_name[0]}</p>
                    )}

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && (
                        <p className="field-error">{errors.username[0]}</p>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className="field-error">{errors.email[0]}</p>
                    )}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <p className="field-error">{errors.password[0]}</p>
                    )}

                    {errors.non_field_errors && (
                        <p className="field-error">{errors.non_field_errors[0]}</p>
                    )}

                    <button type="submit">
                        Register
                    </button>

                </form>

            </div>
        </div>
    );
}


export default Register;