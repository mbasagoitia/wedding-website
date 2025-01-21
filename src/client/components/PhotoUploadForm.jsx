import { useState } from "react";

function UploadForm({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [directory, setDirectory] = useState("");

  const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
  const handleDirectoryChange = (event) => setDirectory(event.target.value);

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('directory', directory);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const { path } = await response.json();
        onUploadSuccess(directory, path);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        value={directory}
        onChange={handleDirectoryChange}
        placeholder="Enter directory (e.g., ceremony photos)"
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
