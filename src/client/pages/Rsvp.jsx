import RSVPForm from "../components/RsvpForm";
import { motion } from "framer-motion";

const Rsvp = () => {
    return (
        <div className="rsvp-content">
            <div className="rsvp-form-area">
                <motion.div 
                    className="rsvp"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <RSVPForm />
                </motion.div>
                </motion.div>
            </div>
            <motion.div 
                className="rsvp-img"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
            >
                <img src="/images/engagement-photos/color-4.jpeg" alt="Engagement Photo" />
            </motion.div>
        </div>
    );
}

export default Rsvp;
