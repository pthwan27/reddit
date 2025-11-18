import fs from 'fs';
import multer from 'multer';
import path from 'path';

const tempDir = path.join(__dirname, '../../../../public/images/temp/posts');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir); // 일단 temp에 저장
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const prefix = file.mimetype.startsWith('video/') ? 'video' : 'image';
    cb(null, `${prefix}-${uniqueSuffix}${ext}`);
  },
});

export const postUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB (비디오 고려)
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  },
}).array('images', 10);
