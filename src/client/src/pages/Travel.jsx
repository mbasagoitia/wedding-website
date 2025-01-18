import { useState, useEffect } from "react"
import HotelCard from "../components/HotelCard";

const Travel = () => {
    const [hotels, setHotels] = useState([]);

    return (
        <div className="travel">
            <div className="hotels">
                {/* {hotels.map((hotel) => (
                    <HotelCard key={hotel.place_id} hotel={hotel} />
                ))} */}
            </div>
        </div>
    )
}

export default Travel;