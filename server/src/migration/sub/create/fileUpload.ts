import fs from 'fs';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const slug = req.body.slug;

      const decodedSlug = decodeURIComponent(slug);

      if (!slug) {
        return cb(new Error('Slug is required'), '');
      }

      const destPath = path.join(
        __dirname,
        '../../../../public/images/subs',
        decodedSlug,
        file.fieldname
      );

      fs.mkdir(destPath, { recursive: true }, (err) => {
        if (err) return cb(err, '');

        cb(null, destPath);
      });
    } catch (error) {
      cb(error as Error, '');
    }
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: 'banner', maxCount: 1 },
  { name: 'icon', maxCount: 1 },
]);
