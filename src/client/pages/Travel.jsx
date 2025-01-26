import hotels from "../helpers/hotels";
import HotelDisplay from "../components/HotelDisplay";
import { Container } from "react-bootstrap";

const Travel = () => {

    return (
        <Container className="travel">
            <h1 className="mb-4">Travel and Accomodations</h1>
            <p>The closest airport is Nashville International Airport (BNA), approximately one hour from the venue by car. While public transportation options are limited near the venue, Nashville has transit services to help you explore the city if you plan to stay there.</p>
            <p>We've compiled a list of lodging options near the wedding venue, Cascata Springs, for your convenience. You may also want to explore Airbnb for local stays that fit your preferences. For those who don't mind a bit of a drive, Nashville is about an hour from the venue and offers a variety of accommodations as well as plenty to see and do.</p>
            <div className="hotel-display d-flex mt-4">
                {hotels.map((hotel, idx) => (
                    <HotelDisplay key={idx} hotel={hotel} />
                ))}
            </div>
        </Container>
    )
}

export default Travel;