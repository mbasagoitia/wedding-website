import express from 'express';
import multer from 'multer';
import validateImageFiles from '../helpers/validateImages.js';
import checkAuth from '../middlewares/checkAuth.js';

import { uploadImages, getImage, getImages } from '../controllers/photoController.js';

const router = express.Router();

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

const upload = multer({ dest: "uploads/" });

router.post('upload', upload.array("images"), checkAuth, validateImageFiles, uploadImages);

router.get('/:directory', getImages);

router.get('/:directory/:file', getImage);

export default router;