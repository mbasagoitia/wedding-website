import { motion } from "framer-motion";
import PreviewCollection from "../components/PreviewCollection";

const Photos = ({ user }) => {
    return (
        <div className="photos">
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>
                Photos
            </motion.h1>
            {!user ? (
                <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                >
                    <p className="my-4">
                        We encourage you to upload photos that you take during the ceremony and reception here so that we can remember our favorite moments from our special day. 
                        Please sign in with your Google account to upload your photos.
                    </p>
                    <div className="mt-4">
                        <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=879762652639-0va910evds26g88gpals8q1v210keln1.apps.googleusercontent.com&redirect_uri=https://wedding.basagoitia.net/api/auth/google/callback&response_type=code&scope=email%20profile"><button className="btn-primary">Link Google Account</button></a>
                    </div>
                </motion.div>
            ) : null}
            <PreviewCollection /> 
        </div>
    );
}

export default Photos;
