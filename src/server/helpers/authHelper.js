import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const getUserIdFromToken = (token) => {
    
    try {    
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded || !decoded.userId) {
            throw new Error("Invalid token structure.");
        }

        return decoded.userId;

    } catch (error) {
        console.error("Error verifying token:", error.message);
        return null;
    }   
}

export default getUserIdFromToken;