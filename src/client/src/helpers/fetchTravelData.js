async function fetchHotels() {
    try {
        const response = await fetch("http://localhost:5000/api/hotels");
        if (!response.ok) {
            throw new Error(`Failed to fetch hotels: ${response.statusText}`);
        }
        const hotels = await response.json();
        return hotels;
    } catch (error) {
        console.error("Error fetching hotels:", error.message);
        return [];
    }
}

async function fetchAttractions() {
    try {
        const response = await fetch("http://localhost:5000/api/attractions");
        if (!response.ok) {
            throw new Error(`Failed to fetch attractions: ${response.statusText}`);
        }
        const attractions = await response.json();
        return attractions;
    } catch (error) {
        console.error("Error fetching attractions:", error.message);
        return [];
    }
}

export {
    fetchHotels,
    fetchAttractions
}