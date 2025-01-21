import { useParams } from "react-router";
import { useState, useEffect } from "react";
import PhotoGrid from "../components/PhotoGrid.jsx";

const PhotoCollection = () => {
    
        const params = useParams();
        const category = params.category;
          
        return (
            <>
            <h1>{category}</h1>
            <PhotoGrid directory={category}/>
            </>
        )
}

export default PhotoCollection;