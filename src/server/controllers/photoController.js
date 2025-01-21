const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const router = express.Router();

const baseUploadDir = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { directory } = req.body;
    const uploadPath = path.join(baseUploadDir, directory);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});


const uploadImage = (req, res) => {
    const { directory } = req.body;
    
    if (!req.file || !directory) {
      return res.status(400).send('Missing file or directory.');
    }
  
    const imagePath = `/uploads/${directory}/${req.file.filename}`;
    res.status(200).json({ path: imagePath });
  };
  

const getImages = (req, res) => {
    const directory = req.params.directory;
    const dirPath = path.join(baseUploadDir, directory);
  
    if (!fs.existsSync(dirPath)) {
      return res.status(404).send('Directory not found.');
    }
  
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return res.status(500).send('Unable to read files.');
      }
      const imagePaths = files.map(file => `/uploads/${directory}/${file}`);
      res.status(200).json(imagePaths);
    });
  };

export {
    uploadImage,
    getImages
}