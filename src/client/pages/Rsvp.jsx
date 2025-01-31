import RSVPForm from "../components/RsvpForm";
import { motion } from "framer-motion";

const Rsvp = () => {
    return (
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
    );
}

export default Rsvp;
