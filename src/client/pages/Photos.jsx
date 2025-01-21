import PhotoPreviews from "../components/PhotoPreviews.jsx";
import { Container } from "react-bootstrap";

const Photos = () => {

    return (
        <Container className="photos">
        <div>
            <h1>Photos</h1>
            <p>We encourage you to upload photos that you take during the ceremony and reception here so that we can remember our favorite moments from our special day. Please link your Google account to upload your photos.</p>
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