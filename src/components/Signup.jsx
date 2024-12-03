import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../css/signup.css";
import Header from "./header";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { handleError, handleSuccess } from "../util";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [credentials, setcredentials] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        setcredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, lname, email, contact, password, cpassword } = credentials;
        if (!fname || !lname || !email || !contact || !password || !cpassword) {
            return handleError('Please fill all the required fields...');
        }
        try {

            const url = "http://lostandfoundserver-production.up.railway.app/auth/signup";

            const response = await axios.post(url, credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { success, message, error} = response.data;

            if (success) {
                console.log("Signup success");
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/log-in');
                }, 1000);
            }
            else if (error) {
                const details = error?.details[0].message || "An error occurred";
                handleError(details);
            }
            else if (!success) {
                handleError(message);
            }

        } catch (err) {
            handleError(err.response?.data?.message || " Something went wrong");
            console.error(err);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <Header />
            <div className="signup-container">
                <div className="box-2">
                    <form onSubmit={handleSubmit}>
                        <h1 className="name">Sign up</h1>
                        <div className="row1">
                            <input
                                type="text"
                                id="firstname"
                                name="fname"
                                placeholder="First Name"

                                onChange={handleSignup}
                            />
                            <input
                                type="text"
                                id="lastname"
                                name="lname"
                                placeholder="Last Name"

                                onChange={handleSignup}
                            />
                        </div>
                        <div className="row1">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"

                                onChange={handleSignup}
                            />
                            <input
                                type="tel"
                                id="number"
                                name="contact"
                                placeholder="Contact"
                                inputMode="numeric"

                                onChange={handleSignup}
                            />
                        </div>
                        <div className="row1">
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    onChange={handleSignup}
                                />
                                <span className="show-signup" onClick={toggleShowPassword}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <div className="password-input">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    id="cpassword"
                                    name="cpassword"
                                    onChange={handleSignup}
                                />
                                <span className="show-signup" onClick={toggleShowConfirmPassword}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="submit">Submit</button>
                        <p className="signup-link">
                            Already have an account? <Link to="/log-in">Click here</Link>
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

