const fetchTravelData = require("../helpers/fetchTravelData");

const getHotels = async (req, res) => {
    const location = "35.4499,-86.7883";
    const radius = 10000;
    const type = "lodging";
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    try {
        const hotels = await fetchTravelData(location, radius, type, apiKey);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch hotels" });
    }
};

const getAttractions = async (req, res) => {
    const location = "35.4499,-86.7883";
    const radius = 10000;
    const type = "tourist_attraction";
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    try {
        const attractions = await fetchTravelData(location, radius, type, apiKey);
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch attractions" });
    }
};

module.exports = {
    getHotels,
    getAttractions,
};
