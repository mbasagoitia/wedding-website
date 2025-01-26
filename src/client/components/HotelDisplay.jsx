function HotelDisplay({ hotel }) {
    
    return (
        <div className="hotel-container w-100 mb-4">
          <div>
            <h2>
              <a href={hotel.website} target="_blank" rel="noreferrer">
                {hotel.name}
              </a>
            </h2>
            <p>{hotel.rating}</p>
            <p>{hotel.address}</p>
          </div>
          <div className="hotel-details">
            <div className="hotel-image">
              <img src={hotel.image} alt="local hotel" className="hotel-img" />
            </div>
            <div className="hotel-description">
              <ul>
                {hotel.description.map((item, index) => (
                  <li key={index} className="mb-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );      
}

export default HotelDisplay;