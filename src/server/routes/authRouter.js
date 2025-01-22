import express from "express";

const app = express();

const router = express.Router();

router.get('/google/callback', authenticateUser);

export default router;
