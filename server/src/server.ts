import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

import { AppDataSource } from './data-source';
import AuthRouter from './routes/authRoutes';
import CommentsRouter from './routes/commentsRoutes';
import HighlightRouter from './routes/highlightRoutes';
import PostRouter from './routes/postRoutes';
import SubRouter from './routes/subRoutes';
import VoteRouter from './routes/voteRoutes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use((req, res, next) => {
  try {
    req.url = decodeURIComponent(req.url);
  } catch (e) {
    console.error('URL decoding error:', e);
  }
  next();
});
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', AuthRouter);
app.use('/sub', SubRouter);
app.use('/post', PostRouter);
app.use('/vote', VoteRouter);
app.use('/comments', CommentsRouter);
app.use('/highlight', HighlightRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('running');
});

const port = 4000;

AppDataSource.initialize()
  .then(() => {
    console.log('✅ DB Connection Success');
    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });
