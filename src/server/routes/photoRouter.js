const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

import { uploadImage, getImages } from '../controllers/photoController';

const app = express();

const router = express.Router();

const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), uploadImage);

router.get('/api/images/:directory', getImages);

export default router;