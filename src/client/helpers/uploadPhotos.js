const uploadPhotos = async (photoUploadData) => {
  try {
    const formData = new FormData();

    photoUploadData.images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("directory", photoUploadData.directory);

    const response = await fetch("http://localhost:5000/photos/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.ok) {
      console.log("Photos uploaded successfully");
    } else {
      console.error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export default uploadPhotos;