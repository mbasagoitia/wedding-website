import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import uploadPhotos from "../helpers/uploadPhotos";

const UploadForm = () => {
  const photoUploadData = {
    directory: "",
    images: []
  };
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [directory, setDirectory] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleDirectoryChange = (event) => setDirectory(event.target.value);

  const handleUpload = async (event) => {
    event.preventDefault();

    if (directory && selectedFiles.length > 0) {
      photoUploadData.images = selectedFiles;
      photoUploadData.directory = directory;

      console.log(photoUploadData);
      uploadPhotos(photoUploadData);

      setSelectedFiles([]);
      setDirectory("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Form onSubmit={handleUpload} className="photo-upload-form">
      <Form.Group controlId="attendance">
        <Form.Label>Directory</Form.Label>
        <Form.Control
          as="select"
          name="directory"
          value={directory}
          onChange={handleDirectoryChange}
          required
        >
          <option value="" disabled hidden>Choose Directory...</option>
          <option value="ceremony">Ceremony</option>
          <option value="reception">Reception</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        ref={fileInputRef}
      />
      
      <div className="d-flex justify-content-center mt-2">
        <Button type="submit">Upload</Button>
      </div>
    </Form>
  );
};

export default UploadForm;
