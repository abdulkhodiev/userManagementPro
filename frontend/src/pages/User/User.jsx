import React, { useEffect, useState } from "react";
import "./user.css";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Table from "../../components/Table/Table";
import axios from "axios";
import Toolbar from "../../components/Toolbar/Toolbar";

const User = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                "https://usermanagementpro.onrender.com/api/control",
                {
                    headers: {
                        "auth-token": token,
                    },
                }
            );

            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="user">
            <Nav />
            <div className="userContainer py-3">
                <div className="titleToolBar d-flex justify-content-between align-items-center">
                    <h2 className="text-center text-white mb-0 fs-4 fw-bold">
                        User Table
                    </h2>
                    <Toolbar
                        selectedRows={selectedRows}
                        fetchData={fetchData}
                        setSelectedRows={setSelectedRows}
                    />
                </div>

                <Table
                    data={userData}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                />
            </div>
        </div>
    );
};

export default User;
