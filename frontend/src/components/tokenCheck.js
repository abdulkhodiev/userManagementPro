import jwt from "jsonwebtoken";

const isTokenExpired = (token) => {
    try {
        const decodedToken = jwt.decode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

        // Check if the token has expired
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Treat decoding errors as an expired token
    }
};

export default isTokenExpired;
