import express from 'express';
import checkout from "../controllers/checkoutController.js";


const router = express.Router();

router.post('/checkout', (req, res) => {
    checkout(req, res);
});

export default router;