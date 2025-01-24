import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import uploadPhotos from "../helpers/uploadPhotos";

const UploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [directory, setDirectory] = useState("");

  const handleFileChange = (event) => setSelectedFiles(Array.from(event.target.files));
  const handleDirectoryChange = (event) => setDirectory(event.target.value);

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });
    formData.append("directory", directory);

    uploadPhotos(formData);
  };

  return (
    
    <Form onSubmit={handleUpload}>
        <Form.Group controlId="attendance">
          <Form.Label>Select Directory</Form.Label>
          <Form.Control
            as="select"
            name="directory"
            value={directory}
            onChange={handleDirectoryChange}
            required
          >
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
