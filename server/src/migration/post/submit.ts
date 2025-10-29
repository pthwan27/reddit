import { RequestHandler } from 'express';

import { Post } from '../../entities/Post';
import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const SubmitHandler: RequestHandler = async (req, res) => {
  const { title, content, slug } = req.body;

  const user: User = res.locals.user;

  if (!user) {
    return res.status(401).json({ error: 'User not found in context' });
  }
  if (!title || !content || !slug) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const sub = await Sub.findOneBy({ slug: slug });

    if (!sub) {
      return res.status(404).json({ error: '커뮤니티를 찾을 수 없습니다.' });
    }

    const post = new Post();

    post.title = title;
    post.body = content;
    post.user = user;
    post.sub = sub;

    post.subTitle = sub.title;

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};
