import fs from 'fs';
import sharp from 'sharp';
import imageType from 'image-type';

const validateImageFiles = async (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  for (let file of files) {
    const filePath = file.path;

    const buffer = fs.readFileSync(filePath);
    const type = await imageType(buffer);
    if (!type || !['jpg', 'jpeg', 'png', 'gif'].includes(type.ext)) {
      fs.unlinkSync(filePath);
      return res.status(400).send('Invalid image file type.');
    }

    try {
      sharp(buffer).metadata();
    } catch (err) {
      fs.unlinkSync(filePath);
      return res.status(400).send('File is not a valid image.');
    }
  }

  next();
};

export default validateImageFiles;
