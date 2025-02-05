import express from 'express';
import sanitizeInputs from '../middlewares/sanitizeInputs';
import submitMessage from '../controllers/messageController';

const router = express.Router();

router.post('/', sanitizeInputs, submitMessage);

export default router;