function HotelDisplay({ hotel }) {

    return (
        <div className="w-100 mb-4">
            <div>
                <h2><a href={hotel.website} target="_blank" rel="noreferrer">{hotel.name}</a></h2>
                <p>{hotel.rating}</p>
                <p>{hotel.address}</p>
            </div>
            <div className="d-flex">
                <div className="w-50">
                    <img src={hotel.image} alt="local hotel" className="hotel-img" />
                </div>
                <div className="w-50">
                    <ul className="w-100 mx-4">
                        {hotel.description.map((item) => (
                            <li className="mb-4">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HotelDisplay;