const express = require("express");
const { getHotels, getAttractions } = require("../controllers/travelController");

const router = express.Router();

router.get("/hotels", getHotels);
router.get("/attractions", getAttractions);

module.exports = router;