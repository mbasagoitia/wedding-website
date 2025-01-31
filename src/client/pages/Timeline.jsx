import TimelineDisplay from "../components/TimelineDisplay";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Install Framer Motion for animations

const Timeline = () => {
    const [flipped, setFlipped] = useState(false);
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="timeline-content">
            <motion.div 
                className={`card-display ${flipped ? "card-back" : "photo-bg"}`} 
                onClick={() => setFlipped(!flipped)}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
            >
            {showHint && (
                <motion.div 
                    className={`flip-hint elegant-text ${flipped ? "d-none" : ""}`}
                    initial={{ y: 0 }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    Click to Flip
                </motion.div>
            )}
                <div className={`timeline mirrored ${!flipped ? "d-none" : ""}`}> 
                    <h2 className="text-center mt-4">Timeline of Events</h2>
                    <TimelineDisplay />
                    <div className="timeline-desc mt-4">
                        <p>
                            <em>
                                We are thrilled to celebrate this special day surrounded by so many of our favorite young people! However, we kindly request that only ladies and gentlemen aged twelve and older join us for our thirty-minute wedding ceremony.
                                <br /><br />
                                For those who feel comfortable, on-site childcare will be available in the reception area, within view of the ceremony. Alternatively, parents are welcome to wait in the reception area with their children during the ceremony.
                                <br /><br />
                                We appreciate your understanding and can't wait to celebrate with you.
                            </em>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Timeline;
