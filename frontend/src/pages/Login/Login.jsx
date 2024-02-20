import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import axios from "axios";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/api/user/login",
                {
                    email,
                    password,
                }
            );

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                navigate("/user");
            } else {
                console.error("Login failed");
                alert(response.data);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert(error.response.data);
        }
    };

    return (
        <div className="login">
            <Nav />
            <div className="loginContainer  d-flex justify-content-center align-items-center flex-column">
                <div className="loginWrapper p-3 rounded-4">
                    <h3 className="loginLogo text-center mb-3 text-white fw-bold fs-2 py-3">
                        Log In
                    </h3>
                    <form onSubmit={handleLoginClick}>
                        <div className="loginBox d-flex flex-column gap-2">
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
                                onClick={handleLoginClick}
                                className="loginButton btn mt-3"
                            >
                                Log In
                            </button>
                            <Link
                                to="/register"
                                className="loginRegisterButton btn"
                            >
                                Create a New Account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
