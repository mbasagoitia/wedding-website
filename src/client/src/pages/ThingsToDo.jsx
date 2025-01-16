import { fetchAttractions } from "../helpers/fetchTravelData"
import { useState, useEffect } from "react"
import AttractionCard from "../components/AttractionCard";

const ThingsToDo = () => {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const getAttractions = async () => {
            try {
                const attractionData = await fetchAttractions();
                console.log("Attractions:", attractionData);
                setAttractions(attractionData)
            } catch (error) {
                console.error("Error fetching attractions:", error.message);
            }
        };

        getAttractions();

    }, []);

    return (
        <div className="things-to-do">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {attractions.map((attraction) => (
                    <AttractionCard key={attraction.place_id} attraction={attraction} />
                ))}
            </div>
        </div>
    )
}

export default ThingsToDo;