import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express-serve-static-core';
import fs from 'fs';
import path from 'path';

import { AppDataSource } from '../../../data-source';
import { Sub } from '../../../entities/Sub';
import { User } from '../../../entities/User';

export const IconUploadHandler: RequestHandler = async (req, res) => {
  try {
    const user: User = res.locals.user;

    if (!user) {
      return res.status(401).json({ error: 'User not found in context' });
    }

    const slug = req.params.slug;

    if (!slug) {
      return res.status(400).json({ error: 'Invalid community slug' });
    }

    const sub = await AppDataSource.getRepository(Sub).findOne({
      where: { slug },
      relations: ['user'],
    });

    if (!sub) {
      return res.status(404).json({ error: 'Community not found' });
    }

    if (instanceToPlain(sub).userId !== user.id) {
      return res
        .status(403)
        .json({ error: 'Only community administrators can make changes' });
    }

    const newIconFile = req.file;
    if (!newIconFile) {
      return res.status(400).json({ error: '아이콘 이미지가 필요합니다.' });
    }

    const oldIconUrn = sub.iconUrn;

    sub.iconUrn = newIconFile.filename;
    await AppDataSource.getRepository(Sub).save(sub);

    const oldIconPath = path.join(
      __dirname,
      '../../../../public/images/subs',
      sub.slug,
      'icon',
      oldIconUrn
    );

    if (fs.existsSync(oldIconPath)) {
      fs.unlink(oldIconPath, (err) => {
        if (err) console.error('Error deleting old icon:', err);
        else console.log('Success deleting old icon:', oldIconPath);
      });
    } else {
      console.warn('No existing icon file to delete:', oldIconPath);
    }

    return res.json({
      iconUrl: sub.iconUrl,
      message: 'Sub icon image uploaded successfully',
    });
  } catch (error) {
    console.error('Error uploading sub icon image:', error);
    return res.status(500).json({ error: 'Failed to upload sub icon image' });
  }
};
