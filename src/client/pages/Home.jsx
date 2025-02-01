import { motion } from "framer-motion";

const Home = () => {
    return (
        <motion.div 
            className="hp-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div 
                className="hp-box"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <div className="hp-info">
                    <p className="hp-subtitle elegant-text">Taryn Chovan and Alex Basagoitia</p>
                    <motion.div 
                        className="hp-details"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <span>May 25, 2025</span>
                        <span className="separator">◯</span>
                        <span>Lewisburg, TN</span>
                        <span className="separator">◯</span>
                        <span>
                            <a href="https://www.cascatasprings.com/" target="_blank" rel="noreferrer">Cascata Springs</a>
                        </span>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div 
                className="hero"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
            >
                <img src="/images/engagement-photos/color-6-cropped.jpeg" alt="Engagement Photo" />
            </motion.div>
        </motion.div>
    );
}

export default Home;
