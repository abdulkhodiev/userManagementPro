import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
    return (
        <div>
            <nav className="px-5 d-flex justify-content-between align-items-center ">
                <div className="logo ">
                    <h3 className="text-white fw-bold fs-2 m-0 ">
                        userManagementPro
                    </h3>
                </div>
                <div className="links d-flex gap-3">
                    <Link className="link-btn" to="/">
                        Home
                    </Link>
                    <Link className="link-btn" to="/register">
                        Sign Up
                    </Link>
                    <Link className="link-btn" to="/login">
                        Log In
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
