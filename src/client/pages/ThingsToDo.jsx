import { Container } from "react-bootstrap";
import AttractionDisplay from "../components/AttractionDisplay";
import attractions from "../helpers/attractions";

const ThingsToDo = () => {

    return (
        <Container className="things-to-do">
            <div>
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
            </div>
        </Container>
    )
}

export default ThingsToDo;