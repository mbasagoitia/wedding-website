import express from 'express';
import sanitizeInputs from '../middlewares/sanitizeInputs.js';
import submitMessage from '../controllers/messageController.js';

const router = express.Router();

router.post('/new', sanitizeInputs, submitMessage);

export default router;