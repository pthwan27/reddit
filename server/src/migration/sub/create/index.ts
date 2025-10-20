import { RequestHandler } from 'express';

import { Sub } from '../../../entities/Sub';
import { User } from '../../../entities/User';

export const CreateHandler: RequestHandler = async (req, res) => {
  const { slug, title, description } = req.body;
  const decodedSlug = decodeURIComponent(slug);
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const user: User = res.locals.user;

  if (!user) {
    return res.status(401).json({ error: 'User not found in context' });
  }
  try {
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

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
