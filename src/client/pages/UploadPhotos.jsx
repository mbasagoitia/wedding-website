import { useState } from "react";
import PhotoUploadForm from "../components/PhotoUploadForm.jsx";
import PreviewCollection from "../components/PreviewCollection.jsx";

const UploadPhotos = ({ user }) => {

    return (
        <div className="photo-upload">
            <div className="pu-upload">
                <h1 className="text-center">Upload Photos</h1>
                {user ? <PhotoUploadForm /> : (
                <div>
                    <p className="text-center">You must be logged in to upload photos.</p>
                    <div className="d-flex justify-content-center">
                        <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=879762652639-0va910evds26g88gpals8q1v210keln1.apps.googleusercontent.com&redirect_uri=https://wedding.basagoitia.net/auth/google/callback&response_type=code&scope=email%20profile"><button className="btn-primary">Link Google Account</button></a>
                    </div>
                </div>
                )}
            </div>
            <div className="pu-previews">
                <PreviewCollection />
            </div>
        </div>
    )
}

export default UploadPhotos;