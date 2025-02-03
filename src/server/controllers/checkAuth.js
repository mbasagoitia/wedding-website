import jwt from "jsonwebtoken";

const checkAuth = (req, res) => {
    const authToken = req.cookies.authToken;
    
    if (!authToken) {
        return res.status(401).json({ isAuthenticated: false, user: null });
    }

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        res.status(200).json({ isAuthenticated: true, user: decoded });
    } catch (error) {
        res.status(401).json({ isAuthenticated: false, user: null });
    }
};

export default checkAuth;
