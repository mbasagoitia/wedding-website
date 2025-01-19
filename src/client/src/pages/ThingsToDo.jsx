import { Container } from "react-bootstrap";
import AttractionDisplay from "../components/AttractionDisplay";
import attractions from "../helpers/attractions";

const ThingsToDo = () => {

    return (
        <Container className="things-to-do">
            <div className="attraction-display d-flex mt-4">
                {attractions.map((attraction, idx) => (
                    <AttractionDisplay key={idx} attraction={attraction} />
                ))}
            </div>
        </Container>
    )
}

export default ThingsToDo;