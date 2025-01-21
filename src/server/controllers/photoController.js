import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUploadDir = path.join(__dirname, '../uploads');

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
      const imagePaths = files.map((file) => `/uploads/${directory}/${file}`);
      console.log(imagePaths);
      res.status(200).json(imagePaths);
    });
  };

const getImage = (req, res) => {
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
    getImage,
    getImages
}