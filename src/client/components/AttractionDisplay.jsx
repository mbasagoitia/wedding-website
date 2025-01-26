function AttractionDisplay({ attraction }) {

    return (
        <div className="attraction-display">
            <div>
                <h2 className="mt-4"><a href={attraction.website} target="_blank" rel="noreferrer">{attraction.name}</a></h2>
                <p>{attraction.address}</p>
            </div>
            <div>
                <p>{attraction.description}</p>
                <img src={attraction.photoUrl} alt={attraction.name} className="attraction-img" />
            </div>
        </div>
    );
}

export default AttractionDisplay;