import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import uploadPhotos from "../helpers/uploadPhotos";

const UploadForm = () => {

  const photoUploadData = {
    directory: "",
    images: []
  }
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [directory, setDirectory] = useState("");

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  } 

  const handleDirectoryChange = (event) => setDirectory(event.target.value);

  const handleUpload = async (event) => {
    event.preventDefault();

    if (directory && selectedFiles.length > 0) {

      selectedFiles.forEach((file, index) => {
        photoUploadData.images = [...photoUploadData.images, file]
      });
      
      photoUploadData.directory = directory;
      console.log(photoUploadData);
      uploadPhotos(photoUploadData);
    }
  };

  return (
    
    <Form onSubmit={handleUpload}>
        <Form.Group controlId="attendance">
          <Form.Label>Directory</Form.Label>
          <Form.Control
            as="select"
            name="directory"
            value={directory}
            onChange={handleDirectoryChange}
            required
          >
            <option value="" selected disabled hidden>Choose Directory...</option>
            <option value="ceremony">Ceremony</option>
            <option value="reception">Reception</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>
      <input type="file" multiple onChange={handleFileChange} />
      <Button type="submit">Upload</Button>
    </Form>
  );
};

export default UploadForm;
