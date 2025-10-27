import { RequestHandler } from 'express';
import fs from 'fs/promises';
import path from 'path';

import { Sub } from '../../../entities/Sub';
import { User } from '../../../entities/User';

export const CreateHandler: RequestHandler = async (req, res) => {
  const { title, description } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const user: User = res.locals.user;

  if (!user) {
    return res.status(401).json({ error: 'User not found in context' });
  }
  try {
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: '커뮤니티 이름을 입력해주세요.' });
    }

    if (title.length < 3) {
      return res
        .status(400)
        .json({ error: '커뮤니티 이름을 3자 이상 입력해주세요.' });
    }

    if (title.length > 20) {
      return res
        .status(400)
        .json({ error: '커뮤니티 이름은 20자 이하여야 합니다.' });
    }

    if (!description || description.trim() === '') {
      return res.status(400).json({ error: '커뮤니티 설명을 입력해주세요.' });
    }
    if (description.length < 2) {
      return res
        .status(400)
        .json({ error: '커뮤니티 설명은 2자 이상 입력해주세요.' });
    }

    if (description.length > 100) {
      return res
        .status(400)
        .json({ error: '커뮤니티 설명은 100자 이하여야 합니다.' });
    }

    const sub = new Sub();
    sub.title = title;
    sub.description = description || title + '주제의 커뮤니티입니다.';
    sub.user = user;

    await sub.save();

    const moveFile = async (file: Express.Multer.File) => {
      const oldPath = file.path;
      const newDir = path.join(
        __dirname,
        '../../../../public/images/subs',
        sub.slug,
        file.fieldname
      );
      await fs.mkdir(newDir, { recursive: true });

      const newPath = path.join(newDir, file.filename);
      await fs.rename(oldPath, newPath);

      return file.filename;
    };

    if (files?.banner) {
      sub.bannerUrn = await moveFile(files.banner[0]);
    }
    if (files?.icon) {
      sub.iconUrn = await moveFile(files.icon[0]);
    }

    await sub.save();

    return res.status(201).json(sub);
  } catch (error) {
    console.error('Error creating sub:', error);
    return res.status(500).json({ error: 'Failed to create sub' });
  }
};
