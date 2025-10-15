import { RequestHandler } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const slug = req.body.slug;

    if (!slug) {
      return cb(new Error('Slug is required'), '');
    }

    const decodedSlug = decodeURIComponent(slug);

    const destPath = path.join(
      __dirname,
      '../../../public/images/subs',
      decodedSlug,
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

// 'banner'와 'icon' 필드의 파일을 처리하는 multer 미들웨어
export const upload = multer({ storage }).fields([
  { name: 'banner', maxCount: 1 },
  { name: 'icon', maxCount: 1 },
]);

export const CreateHandler: RequestHandler = async (req, res) => {
  const { slug, title, description } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const user: User = res.locals.user;

  try {
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    const decodedSlug = decodeURIComponent(slug);

    const sub = new Sub();
    sub.slug = decodedSlug;
    sub.title = title;
    sub.description = description || title + '주제의 커뮤니티입니다.';
    sub.user = user;

    if (files?.banner) {
      sub.bannerUrn = files.banner[0].filename;
    }
    if (files?.icon) {
      sub.iconUrn = files.icon[0].filename;
    }

    await sub.save();

    return res.status(201).json(sub);
  } catch (error) {
    console.error('Error creating sub:', error);
    return res.status(500).json({ error: 'Failed to create sub' });
  }
};
