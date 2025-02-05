import express from "express";

import submitRsvp from "../controllers/rsvpController.js";
import sanitizeInputs from '../middlewares/sanitizeInputs.js';

const router = express.Router();

router.post('/submit-new', sanitizeInputs, submitRsvp);

export default router;
