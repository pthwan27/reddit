import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

// ...
import { AppDataSource } from './data-source';
import AuthRouter from './routes/auth/authRoutes';
import SubRouter from './routes/auth/subRoutes';

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

app.get('/', (_: Request, res: Response) => {
  res.send('running');
});

const port = 4000;

app.listen(port, async () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);

  AppDataSource.initialize()
    .then(async () => {
      console.log('DB Connection');
    })
    .catch((error) => console.log(error));
});
