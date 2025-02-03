import express from "express";

import submitRsvpForm from "../controllers/rsvpController.js";
import sanitizeInputs from '../middleware/sanitizeInputs.js';

const router = express.Router();

router.post('/submit-new', sanitizeInputs, submitRsvpForm);

export default router;
