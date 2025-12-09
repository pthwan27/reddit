import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';
import fs from 'fs/promises';
import path from 'path';

import { AppDataSource } from '../../../data-source';
import { Sub } from '../../../entities/Sub';
import { Subscription } from '../../../entities/Subscription';
import { User } from '../../../entities/User';

export const CreateHandler: RequestHandler = async (req, res) => {
  const { title, description } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const user: User = res.locals.user;

  if (!user) {
    return res.status(401).json({ error: 'User not found in context' });
  }
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: '커뮤니티 이름을 입력해주세요.' });
  }

  if (title.length < 3) {
    return res
      .status(400)
      .json({ error: '커뮤니티 이름을 3자 이상 입력해주세요.' });
  }

  if (title.includes('-')) {
    return res
      .status(400)
      .json({ error: "커뮤니티 이름에 '-'를 포함할 수 없습니다." });
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

  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const sub = new Sub();
    sub.title = title;
    sub.description = description || title + '주제의 커뮤니티입니다.';
    sub.user = user;

    await queryRunner.manager.save(sub);

    const subscription = new Subscription();
    subscription.user = user;
    subscription.sub = sub;
    await queryRunner.manager.save(subscription);

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

    await queryRunner.manager.save(sub);
    await queryRunner.commitTransaction();

    return res.status(201).json(instanceToPlain(sub));
  } catch (error) {
    console.error('Error creating sub:', error);

    await queryRunner.rollbackTransaction();
    await cleanupTempFiles(files);

    return res.status(500).json({ error: 'Failed to create sub' });
  } finally {
    await queryRunner.release();
  }
};

const cleanupTempFiles = async (
  files: { [fieldname: string]: Express.Multer.File[] } | undefined
) => {
  if (!files) return;

  try {
    for (const fieldname in files) {
      const fileArray = files[fieldname];

      for (const file of fileArray) {
        try {
          await fs.unlink(file.path);
        } catch (unlinkError) {
          console.error(
            `Failed to delete temp file ${file.path}:`,
            unlinkError
          );
        }
      }
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};
