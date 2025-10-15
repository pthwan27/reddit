import fs from 'fs';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const title = req.body.title;

    if (!title) {
      return cb(new Error('Title is required'), '');
    }

    const destPath = path.join(
      __dirname,
      '../../../public/subs',
      title,
      file.fieldname
    );

    fs.mkdir(destPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, '');
      }
      cb(null, destPath);
    });
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage }).fields([
  { name: 'banner', maxCount: 1 },
  { name: 'icon', maxCount: 1 },
]);
