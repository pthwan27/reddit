import { RequestHandler } from 'express-serve-static-core';

export const ProfileUploadHandler: RequestHandler = async (req, res) => {
  try {
    // const user: User = res.locals.user;
    // if (!user) {
    //   return res.status(401).json({ error: 'User not found in context' });
    // }
    // const newProfileFile = req.file;
    // if (!newProfileFile) {
    //   return res.status(400).json({ error: '프로필 이미지가 필요합니다.' });
    // }
    // const oldProfileUrn = user.profileUrn;
    // user.profileUrn = newProfileFile.filename;
    // await AppDataSource.getRepository(User).save(user);
    // const oldProfilePath = path.join(
    //   __dirname,
    //   '../../../../public/images/user',
    //   user.id.toString(),
    //   'profile',
    //   oldProfileUrn
    // );
    // if (fs.existsSync(oldProfilePath)) {
    //   fs.unlink(oldProfilePath, (err) => {
    //     if (err) console.error('Error deleting old profile:', err);
    //     else console.log('Success deleting old profile:', oldProfilePath);
    //   });
    // } else {
    //   console.warn('No existing profile file to delete:', oldProfilePath);
    // }
    // return res.json({
    //   profileUrl: user.profileUrn,
    //   message: 'User profile image uploaded successfully',
    // });
  } catch (error) {
    console.error('Error uploading user profile image:', error);
    return res
      .status(500)
      .json({ error: 'Failed to upload user profile image' });
  }
};
