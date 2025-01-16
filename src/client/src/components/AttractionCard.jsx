function AttractionCard({ attraction }) {
    const photoUrl = attraction.photos?.[0]?.photo_reference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${attraction.photos[0].photo_reference}&key=YOUR_API_KEY`
        : "https://via.placeholder.com/400";

    return (
        <div className="attraction-card" style={{ border: "1px solid #ccc", padding: "16px", margin: "16px" }}>
            <img
                src={photoUrl}
                alt={attraction.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h2>{attraction.name}</h2>
            <p>{attraction.vicinity}</p>
            <p>
                <strong>Rating:</strong> {attraction.rating} ({attraction.user_ratings_total} reviews)
            </p>
            <a 
                href={`https://www.google.com/maps/place/?q=place_id:${attraction.place_id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
            >
                View on Google Maps
            </a>
        </div>
    );
}
