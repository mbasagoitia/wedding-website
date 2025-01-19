function AttractionDisplay({ attraction }) {

    return (
        <div className="w-100 mb-4">
            <div>
                <h2><a href={attraction.website} target="_blank" rel="noreferrer">{attraction.name}</a></h2>
                <p>{attraction.address}</p>
            </div>
            <div className="w-100">
                <p>{attraction.description}</p>
                <img src={attraction.photoUrl} alt={attraction.name} className="attraction-img" />
            </div>
        </div>
    );
}

export default AttractionDisplay;