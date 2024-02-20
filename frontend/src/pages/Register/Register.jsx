import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import axios from "axios";
import "../Login/login.css";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://usermanagementpro.onrender.com/api/user/register",
                {
                    name,
                    email,
                    password,
                }
            );

            if (response.status === 201) {
                navigate("/login");
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert(error.response.data);
        }
    };

    return (
        <div className="login">
            <Nav />
            <div className="loginContainer d-flex justify-content-center align-items-center flex-column">
                <div className="loginWrapper p-3 rounded-4">
                    <h3 className="loginLogo text-center mb-3 text-white fw-bold fs-2 py-3">
                        Sign Up
                    </h3>

                    <form onSubmit={handleRegisterSubmit}>
                        <div className="loginBox d-flex flex-column gap-2">
                            <input
                                className="loginInput"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className="loginInput"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="loginInput"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="loginButton btn mt-3"
                            >
                                Sign Up
                            </button>

                            <Link
                                to="/login"
                                className="loginRegisterButton btn"
                            >
                                Already have an account?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
