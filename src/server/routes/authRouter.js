import express from "express";

import authenticateUser from "../controllers/authController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get('/google/callback', authenticateUser);

router.get("/status", checkAuth, (req, res) => {
    return res.status(200).json({ isAuthenticated: true, user: req.user });
});

export default router;
