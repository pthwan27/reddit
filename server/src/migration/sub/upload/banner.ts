import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express-serve-static-core';
import fs from 'fs';
import path from 'path';

import { AppDataSource } from '../../../data-source';
import { Sub } from '../../../entities/Sub';
import { User } from '../../../entities/User';

export const BannerUploadHandler: RequestHandler = async (req, res) => {
  try {
    const user: User = res.locals.user;

    if (!user) {
      return res.status(401).json({ error: 'User not found in context' });
    }

    const subId: number = parseInt(req.params.id, 10);
    if (isNaN(subId)) {
      return res.status(400).json({ error: 'Invalid community ID' });
    }

    const sub = await AppDataSource.getRepository(Sub).findOne({
      where: { id: subId },
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

    const newBannerFile = req.file;
    if (!newBannerFile) {
      return res.status(400).json({ error: '배너 이미지가 필요합니다.' });
    }

    const oldBannerUrn = sub.bannerUrn;

    sub.bannerUrn = newBannerFile.filename;
    await AppDataSource.getRepository(Sub).save(sub);

    const oldBannerPath = path.join(
      __dirname,
      '../../../../public/images/subs',
      sub.slug,
      'banner',
      oldBannerUrn
    );

    if (fs.existsSync(oldBannerPath)) {
      fs.unlink(oldBannerPath, (err) => {
        if (err) console.error('Error deleting old banner:', err);
        else console.log('Success deleting old banner:', oldBannerPath);
      });
    } else {
      console.warn('No existing banner file to delete:', oldBannerPath);
    }

    return res.json({
      bannerUrl: sub.bannerUrl,
      message: 'Sub banner image uploaded successfully',
    });
  } catch (error) {
    console.error('Error uploading sub banner image:', error);
    return res.status(500).json({ error: 'Failed to upload sub banner image' });
  }
};
