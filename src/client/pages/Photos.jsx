import PhotoPreviews from "../components/PhotoPreviews.jsx";
import { Container } from "react-bootstrap";

const Photos = () => {

    return (
        <Container className="photos">
        <div>
            <h1>Photos</h1>
            <p>We encourage you to upload photos that you take during the ceremony and reception here so that we can remember our favorite moments from our special day. Please sign in with your Google account to upload your photos.</p>
            <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=879762652639-0va910evds26g88gpals8q1v210keln1.apps.googleusercontent.com&redirect_uri=https://wedding.basagoitia.net/auth/google/callback&response_type=code&scope=email%20profile"><button>Link Google Account</button></a>
        </div>
        <div className="photo-preview-section d-flex justify-content-evenly">
            <PhotoPreviews title={"Engagement Photos"} link={"engagement-photos"} photo1={"/images/engagement-photos/color-2.jpeg"} photo2={"/images/engagement-photos/bw-1.jpeg"} />
            <PhotoPreviews title={"Ceremony (Coming soon)"} link={"ceremony"} photo1={"/images/placeholder-image.jpg"} />
            <PhotoPreviews title={"Reception (Coming soon)"} link={"reception"} photo1={"/images/placeholder-image.jpg"} />
            <PhotoPreviews title={"Other (Coming soon)"} link={"other"} photo1={"/images/placeholder-image.jpg"} />
        </div>
        </Container>
    )
}

export default Photos;