import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY;

router.get("/maps-api-key", (req, res, next) => {
    res.json({ googlePlacesApiKey });
})


export default router;