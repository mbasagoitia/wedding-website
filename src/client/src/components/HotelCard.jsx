function HotelCard({ hotel }) {
    const photoUrl = hotel.photos?.[0]?.photo_reference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=YOUR_API_KEY`
        : "https://via.placeholder.com/400";

    return (
        <div className="hotel-card" style={{ border: "1px solid #ccc", padding: "16px", margin: "16px" }}>
            <img 
                src={photoUrl} 
                alt={hotel.name} 
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h2>{hotel.name}</h2>
            <p>{hotel.vicinity}</p>
            <p>
                <strong>Rating:</strong> {hotel.rating} ({hotel.user_ratings_total} ratings)
            </p>
        </div>
    );
}

export default HotelCard;