import React from "react";
import "./toolbar.css";
import axios from "axios";

const Toolbar = ({ selectedRows, fetchData, setSelectedRows }) => {
    const handleDelete = async () => {
        try {
            if (selectedRows.length === 0) {
                console.error("No user selected for deletion");
                return;
            }

            console.log("Deleting users with IDs:", selectedRows);

            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token available. Please log in.");
                return;
            }

            const response = await axios.delete(
                "https://usermanagementpro.onrender.com/api/control/",
                {
                    headers: {
                        "auth-token": token,
                    },
                    data: { userIds: selectedRows },
                }
            );

            if (response.status === 200) {
                console.log("Users deleted successfully.");
                fetchData();
                setSelectedRows([]);
            } else {
                console.error(
                    "Failed to delete users. Status code:",
                    response.status
                );
            }
        } catch (error) {
            console.error("Error deleting users:", error);

            if (error.response) {
                console.error("Response status code:", error.response.status);
                console.error("Response data:", error.response.data);
            }
        }
    };
    const handleBlockUnblock = async (action) => {
        try {
            console.log(
                `Updating users with IDs: ${selectedRows} - Action: ${action}`
            );

            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token available. Please log in.");
                return;
            }

            await axios.put(
                "https://usermanagementpro.onrender.com/api/control",
                {
                    userIds: selectedRows,
                    action: action,
                },
                {
                    headers: {
                        "auth-token": token,
                    },
                }
            );

            fetchData();
        } catch (error) {
            console.error("Error updating users' status:", error);

            if (error.response && error.response.status === 401) {
                console.error("Unauthorized. Check authentication token.");
            }
        }
    };

    return (
        <div className="toolbar d-flex gap-2">
            <button
                type="button"
                className="link-btn block"
                onClick={() => handleBlockUnblock("block")}
            >
                <i className="fa-solid fa-lock"></i>
            </button>
            <button
                className="unblock link-btn"
                type="button"
                onClick={() => handleBlockUnblock("unblock")}
            >
                <i className="fa-solid fa-unlock"></i>
            </button>
            <button
                type="button"
                className="delete link-btn"
                onClick={handleDelete}
            >
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    );
};

export default Toolbar;
