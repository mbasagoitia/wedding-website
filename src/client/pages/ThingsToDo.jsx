import { Container } from "react-bootstrap";
import AttractionDisplay from "../components/AttractionDisplay";
import attractions from "../helpers/attractions";
import { motion } from "framer-motion";

const ThingsToDo = () => {

    return (
        <Container className="things-to-do">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1>Lewisburg</h1>
                <div className="mt-4 attraction-container">
                    {attractions.lewisburg.map((attraction, idx) => (
                    <AttractionDisplay key={idx} attraction={attraction} />
                    ))}
                </div>
                <h1 className="mt-4">Nashville</h1>
                <div className="mt-4 attraction-container">
                    {attractions.nashville.map((attraction, idx) => (
                    <AttractionDisplay key={idx} attraction={attraction} />
                    ))}
                </div>
            </motion.div>
        </Container>
    )
}

export default ThingsToDo;