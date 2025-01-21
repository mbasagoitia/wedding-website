import { Container } from "react-bootstrap";
import AttractionDisplay from "../components/AttractionDisplay";
import attractions from "../helpers/attractions";

const ThingsToDo = () => {

    return (
        <Container className="things-to-do">
            <div className="attraction-display d-flex">
                <h1>Lewisburg</h1>
                <div className="mt-4">
                    {attractions.lewisburg.map((attraction, idx) => (
                    <AttractionDisplay key={idx} attraction={attraction} />
                    ))}
                </div>
                <h1>Nashville</h1>
                <div className="mt-4">
                    {attractions.nashville.map((attraction, idx) => (
                    <AttractionDisplay key={idx} attraction={attraction} />
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default ThingsToDo;