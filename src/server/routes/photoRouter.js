import express from 'express';
import multer from 'multer';

import { uploadImage, getImage, getImages } from '../controllers/photoController.js';

const app = express();

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

const upload = multer({ storage });

app.post('/uploads', upload.single('image'), uploadImage);

router.get('/images/:directory', getImages);

router.get('/images/:directory/:file', getImage);

export default router;