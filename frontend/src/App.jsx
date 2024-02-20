import { Routes, Route } from "react-router-dom";
import User from "./pages/User/User";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Landing from "./pages/Landing/Landing";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default App;
