import React from "react";
import "./table.css";

const formatDateTime = (isoDateString) => {
    const isoDate = new Date(isoDateString);
    const formattedDate = isoDate.toLocaleDateString();
    const formattedTime = isoDate.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
};

const Table = ({ data, selectedRows, setSelectedRows }) => {
    const handleRowSelection = (userId) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(userId)) {
                return prevSelectedRows.filter((id) => id !== userId);
            } else {
                return [...prevSelectedRows, userId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        } else {
            const allUserIds = data.map((user) => user._id);
            setSelectedRows(allUserIds);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Registration</th>
                        <th>Last Login</th>
                        <th>Status</th>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={
                                    selectedRows.length === data.length &&
                                    data.length > 0
                                }
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{formatDateTime(user.registrationTime)}</td>
                            <td>{formatDateTime(user.loginTime)}</td>
                            <td>
                                <span className="status">
                                    {user.isActive ? "Active" : "Blocked"}
                                </span>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() =>
                                        handleRowSelection(user._id)
                                    }
                                    checked={selectedRows.includes(user._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
