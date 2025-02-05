const uploadPhotos = async (photoUploadData) => {
  try {
    const formData = new FormData();

    photoUploadData.images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("directory", photoUploadData.directory);

    const response = await fetch("/api/photos/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message || "Photos uploaded successfully!" };
    } else {
      return { success: false, message: "Upload failed. Please try again." };
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, message: "An error occurred while uploading. Please try again later." };
  }
};

export default uploadPhotos;
