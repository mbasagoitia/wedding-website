const fetch = require("node-fetch");

async function fetchTravelData(location, radius, type, apiKey) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.status !== "OK") {
            throw new Error(`API error: ${data.status} - ${data.error_message || "Unknown error"}`);
        }
        return data.results;
    } catch (error) {
        throw error;
    }
}

module.exports = fetchTravelData;
