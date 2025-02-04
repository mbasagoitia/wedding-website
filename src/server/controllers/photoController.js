import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUploadDir = path.join(__dirname, '../uploads');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const uploadImages = async (req, res) => {
    const files = req.files;
    const directory = req.body.directory;
    const { user } = req;

    try {
      if (!files || files.length === 0) {
        return res.status(400).send("No files uploaded.");
      }
      if (!directory) {
        return res.status(400).send("Directory is required.");
      }
  
      const targetDir = path.join(__dirname, "../uploads", directory);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
  
      for (let file of files) {
        const targetPath = path.join(targetDir, file.originalname);

        fs.renameSync(file.path, targetPath);
        // console.log(targetPath);
  
        await db.query(
          "INSERT INTO GuestPhotos (guest_id, file_path) VALUES (?, ?)",
          [user.id, targetPath]
        );
      }
  
      res.status(200).send({ message: "Files uploaded successfully!" });
    } catch (error) {
      console.error("Error processing upload:", error);
      res.status(500).send("Server error. Please try again.");
    }
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
        // Potential issues here
        const imagePaths = files.map(file => `${req.protocol}://${req.get('host')}/uploads/${directory}/${file}`);
        res.status(200).json(imagePaths);
        console.log(imagePaths)
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
    uploadImages,
    getImage,
    getImages
}