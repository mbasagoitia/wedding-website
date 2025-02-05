import express from "express";

import authenticateUser from "../controllers/authController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get('/google/callback', authenticateUser);
// Logic here is wrong
router.get("/status", checkAuth, (req, res) => {
    if (req.user) {
        return res.status(200).json({ isAuthenticated: true, user: req.user })
    }
    return res.status(401).json({ isAuthenticated: false, user: null });
});

export default router;
