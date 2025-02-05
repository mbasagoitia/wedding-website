import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const db = mysql.createPool(dbConfig);

const checkAuth = async (req, res, next) => {
    const authToken = req.cookies.authToken;
    
    if (!authToken) {
        return res.status(401).json({ isAuthenticated: false, user: null });
    }

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        
        const [rows] = await db.query("SELECT * FROM AuthenticatedUsers WHERE id = ?", [decoded.userId]);

        if (rows.length === 0) {
            return res.status(403).json({ isAuthenticated: false, user: null, message: "User does not exist" });
        }

        req.user = rows[0];
        next();
    } catch (error) {
        return res.status(401).json({ isAuthenticated: false, user: null });
    }
};

export default checkAuth;
