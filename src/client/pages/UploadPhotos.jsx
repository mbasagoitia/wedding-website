import { useState, useEffect } from "react";
import PhotoUploadForm from "../components/PhotoUploadForm.jsx";
import PreviewCollection from "../components/PreviewCollection.jsx";

const UploadPhotos = () => {

const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check to see if user has permission to visit this route and upload photos
    }, [isLoggedIn])

    return (
        <div className="photo-upload">
            <div className="pu-upload">
                <h1 className="text-center">Upload Photos</h1>
                <PhotoUploadForm />
            </div>
            <div className="pu-previews">
                <PreviewCollection />
            </div>
        </div>
    )
}

export default UploadPhotos;