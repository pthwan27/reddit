import fs from 'fs';
import multer from 'multer';
import path from 'path';

import { AppDataSource } from '../../../data-source';
import { Sub } from '../../../entities/Sub';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const slug = req.params.slug;

      if (!slug) {
        return cb(new Error('Invalid community slug'), '');
      }

      const sub = await AppDataSource.getRepository(Sub).findOneBy({
        slug,
      });

      if (!sub) {
        return cb(new Error('Community not found'), '');
      }

      const destPath = path.join(
        __dirname,
        '../../../../public/images/subs',
        sub.slug,
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

export const iconUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('icon');

export const bannerUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('banner');
