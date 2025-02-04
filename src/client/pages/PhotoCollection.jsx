import { useParams } from "react-router";
import { useState, useEffect } from "react";
import PhotoGrid from "../components/PhotoGrid.jsx";

const PhotoCollection = () => {
    
    const params = useParams();
    const category = params.category;

    function convertToTitleCase(str) {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

        
    return (
        <div className="photo-collection-page">
            <h1 className="mb-4">{convertToTitleCase(category)}</h1>
            <PhotoGrid directory={category}/>
        </div>
    )
}

export default PhotoCollection;