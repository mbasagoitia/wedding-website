import { useState } from "react";
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
    <form onSubmit={handleUpload}>
      <input type="file" multiple onChange={handleFileChange} />
      <input
        type="text"
        value={directory}
        onChange={handleDirectoryChange}
        placeholder="Enter directory (e.g., ceremony photos)"
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
