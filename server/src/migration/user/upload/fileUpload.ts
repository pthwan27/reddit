import fs from 'fs';
import multer from 'multer';
import path from 'path';

import { AppDataSource } from '../../../data-source';
import { User } from '../../../entities/User';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        return cb(new Error('Invalid user ID'), '');
      }

      const user = await AppDataSource.getRepository(User).findOneBy({
        id: userId,
      });

      if (!user) {
        return cb(new Error('User not found'), '');
      }

      const destPath = path.join(
        __dirname,
        '../../../../public/images/user',
        user.id.toString(),
        'profile',
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

export const profileUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('profile');
