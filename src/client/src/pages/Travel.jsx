import { fetchHotels } from "../helpers/fetchTravelData"
import { useState, useEffect } from "react"
import HotelCard from "../components/HotelCard";

const Travel = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const getHotels = async () => {
            try {
                const hotelData = await fetchHotels();
                console.log("Hotels:", hotelData);
                setHotels(hotelData)
            } catch (error) {
                console.error("Error fetching hotels:", error.message);
            }
        };

        getHotels();

    }, []);

    return (
        <div className="travel">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {hotels.map((hotel) => (
                    <HotelCard key={hotel.place_id} hotel={hotel} />
                ))}
            </div>
        </div>
    )
}

export default Travel;