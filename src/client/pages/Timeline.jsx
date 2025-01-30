import TimelineDisplay from "../components/TimelineDisplay";
import { useState, useEffect } from "react";

const Timeline = () => {
    // Click to open feature? Card with photo on "front" and timeline info inside?
    const [flipped, setFlipped] = useState(true);
    
    return (
        <div className="timeline-content">
            <div className={`card-display ${flipped ? "card-back" : "photo-bg"}`}>
                <div className="timeline py-4"> 
                    <h2 className="text-center">Timeline of Events</h2>
                    <TimelineDisplay />
                    <div className="timeline-desc mt-4">
                        <p><em>We are thrilled to celebrate this special day surrounded by so many of our favorite young people! However, we kindly request that only ladies and gentlemen aged twelve and older join us for our thirty-minute wedding ceremony.<br></br><br></br>For those who feel comfortable, on-site childcare will be available in the reception area, within view of the ceremony. Alternatively, parents are welcome to wait in the reception area with their children during the ceremony.<br></br><br></br>We appreciate your understanding and can't wait to celebrate with you.</em></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline;