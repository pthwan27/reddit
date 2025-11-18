import { RequestHandler } from 'express';
import fs from 'fs/promises';
import path from 'path';

import { Post } from '../../entities/Post';
import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const SubmitHandler: RequestHandler = async (req, res) => {
  const { title, content, postType, slug, mediaType } = req.body;

  const files = req.files as Express.Multer.File[];
  let linkUrl = null;

  const user: User = res.locals.user;

  if (!user) {
    return res.status(401).json({ error: 'User not found in context' });
  }
  if (!title || !content || !slug || !postType) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (postType === 'link') {
    linkUrl = req.body.linkUrl;
    if (!linkUrl) {
      return res
        .status(400)
        .json({ error: 'Link URL is required for link posts' });
    }
  }

  try {
    const sub = await Sub.findOneBy({ slug: slug });

    if (!sub) {
      return res.status(404).json({ error: '커뮤니티를 찾을 수 없습니다.' });
    }

    const post = new Post();

    post.title = title;
    post.body = content || '';
    post.user = user;
    post.sub = sub;
    post.subTitle = sub.title;
    post.postType = postType;
    if (postType === 'link') {
      post.linkUrl = linkUrl;
    }

    await post.save();

    const moveFile = async (file: Express.Multer.File, postSlug: string) => {
      console.log('Moving file:', file.filename, 'for post:', postSlug);

      const oldPath = file.path;

      const baseDir = path.resolve(__dirname, '../../../public/images/posts');
      const newDir = path.join(baseDir, postSlug);
      try {
        await fs.access(oldPath);
      } catch (error) {
        console.error('Source file does not exist:', error);

        throw new Error(`Source file not found: ${oldPath}`);
      }

      await fs.mkdir(newDir, { recursive: true });

      const newPath = path.join(newDir, file.filename);
      await fs.rename(oldPath, newPath);

      return `/images/posts/${postSlug}/${file.filename}`;
    };

    if (postType === 'media' && files && files.length > 0) {
      if (mediaType === 'video' && files.length === 1) {
        const videoFile = files[0];
        const videoPath = await moveFile(videoFile, post.slug);

        post.videoUrn = videoPath;
        post.mediaType = 'video';
      } else if (mediaType === 'image') {
        const imagePaths: string[] = [];

        for (const file of files) {
          const imagePath = await moveFile(file, post.slug);
          imagePaths.push(imagePath);
        }

        post.imageUrns = imagePaths;
        post.mediaType = 'image';
      }

      await post.save();
    }

    return res.status(201).json(post);
  } catch (error) {
    cleanupTempFiles(files);

    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};

const cleanupTempFiles = async (files: Express.Multer.File[]) => {
  if (files && files.length > 0) {
    for (const file of files) {
      try {
        await fs.unlink(file.path);
      } catch (unlinkError) {
        console.error('Failed to delete temp file:', unlinkError);
      }
    }
  }
};
