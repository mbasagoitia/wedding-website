import express from "express";

import checkAuth from "../controllers/checkAuth.js";
import authenticateUser from "../controllers/authController.js";

const router = express.Router();

router.get('/google/callback', authenticateUser);
router.get("/status", checkAuth);

export default router;
