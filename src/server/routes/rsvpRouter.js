import express from "express";

import submitRsvpForm from "../controllers/rsvpController.js";

const router = express.Router();

router.post('/submit-new', submitRsvpForm);

export default router;
