const uploadPhotos = async (formData) => {
    try {
        const response = await fetch('http://localhost:5000/photos/upload', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData })
        });
          if (response.ok) {
            // const { path } = await response.json();
            console.log("Photos uploaded successfully");
            // Redirect or alert as needed, fetch directory
          } else {
            console.error('Upload failed');
          }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
};


export default uploadPhotos;