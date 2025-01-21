import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import frontMatter from "front-matter";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import PhotoGrid from "./PhotoGrid";

function PhotoCollection({ defaultImages, collection }) {
    
    const [title, setTitle] = useState("");
    const [imagePaths, setImagePaths] = useState([]);

    // Fetch and display images from the corresponding markdown file, which is updated every time a user uploads an image

    useEffect(() => {
        const markdownFilePath = `/content/pages/resources/videos-and-photos/${collection}.md`;

        fetch(markdownFilePath)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response error")
            }
            return res.text();
        })
        .then((data) => {
            let frontMatterData = frontMatter(data);
            setImagePaths(frontMatterData.attributes.images ? frontMatterData.attributes.images.map((image) => image.image) : []);
            setTitle(frontMatterData.attributes.title);
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    const allImages = [...defaultImages, ...imagePaths];

    return (
        <Container fluid>
            <Header />
            <Navigation />
            <div className="full-page-img">
                <img src="/images/resources/emergency-contacts-header.jpg" alt="CALO team" className="header-img" />
            </div>
            <div className="page-content">
                {title && <h1>{title}</h1>}
                <p className="text-muted mt-4 enlarge-text"><svg xmlns="http://www.w3.org/2000/svg" className="mx-2" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>Click on any photo to enlarge</p>
                <PhotoGrid images={allImages} />
                <div className="back-btn mt-4">
                    <Link to={"/resources/videos-and-photos"}><svg xmlns="http://www.w3.org/2000/svg" className="mx-2" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>Back</Link>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default PhotoCollection;