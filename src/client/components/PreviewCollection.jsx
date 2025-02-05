import PhotoPreviews from "./PhotoPreviews.jsx";
import { motion } from "framer-motion";

const PreviewCollection = () => {
    const baseURL = "/photos/";

    return (
        <motion.div 
        className="photo-preview-section"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 2, staggerChildren: 0.5 } }
        }}
    >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <PhotoPreviews title={"Engagement Photos"} link={`${baseURL}engagement-photos`} photo1={"/images/engagement-photos/color-2.jpeg"} photo2={"/images/engagement-photos/bw-1.jpeg"} />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <PhotoPreviews title={"Ceremony (Coming soon)"} link={`${baseURL}ceremony`} photo1={"/images/placeholder-image.jpg"} />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <PhotoPreviews title={"Reception (Coming soon)"} link={`${baseURL}reception`} photo1={"/images/placeholder-image.jpg"} />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <PhotoPreviews title={"Other (Coming soon)"} link={`${baseURL}other`} photo1={"/images/placeholder-image.jpg"} />
            </motion.div>
        </motion.div>
    )
}

export default PreviewCollection;