import express from 'express';
import checkout from "../controllers/chec"


const router = express.Router();

router.post('/create-checkout-session', (req, res) => {
    checkout(req, res);
});

export default router;