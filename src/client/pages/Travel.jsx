import hotels from "../helpers/hotels";
import HotelDisplay from "../components/HotelDisplay";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

const Travel = () => {

    return (
        <Container className="travel">
            <motion.h1 
                className="mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Travel and Accommodations
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                The closest airport is Nashville International Airport (BNA), approximately one hour from the venue by car. While public transportation options are limited near the venue, Nashville has transit services to help you explore the city if you plan to stay there.
            </motion.p>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                We've compiled a list of lodging options near the wedding venue, Cascata Springs, for your convenience. You may also want to explore Airbnb for local stays that fit your preferences. For those who don't mind a bit of a drive, Nashville is about an hour from the venue and offers a variety of accommodations as well as plenty to see and do.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
            <div className="hotel-display d-flex mt-5">
                {hotels.map((hotel, idx) => (
                    <HotelDisplay key={idx} hotel={hotel} />
                ))}
            </div>
            </motion.div>

        </Container>
    )
}

export default Travel;