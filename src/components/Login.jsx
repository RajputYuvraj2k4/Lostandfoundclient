import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../css/login.css";
import Header from "./header";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const [credentials, setCredentials] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;

        if (!email || !password) {
            return handleError('Please fill all the required fields...');
        }

        try {
            const response = await axios.post("http://lostandfoundserver-production.up.railway.app/auth/login", credentials, {
                headers: { "Content-Type": "application/json" },
            });

            const { success, message, jwtToken, user } = response.data;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('user', JSON.stringify(user));
                setTimeout(() => navigate('/feed'), 1000);
            } else {
                handleError(message || "An error occurred during login");
            }
        } catch (err) {
            handleError(err.response?.data?.message || "Something went wrong");
            console.error(err);
        }
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div>
            <Header />
            <div className="login-container">
                <div className="login-box">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h1>Log in</h1>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email id"
                            onChange={handleLoginChange}
                        />
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                id="password"
                                name="password"
                                onChange={handleLoginChange}
                            />
                            <span className="show-password" onClick={toggleShowPassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button type="submit" className="submit-btn">Log in</button>
                        <p className="signup-link">
                            Don't have an account? <Link to="/sign-up">Click here</Link>
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Login;
