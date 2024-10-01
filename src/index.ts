
import express from "express";
import { renderToString } from 'react-dom/server';
import cookieParser from "cookie-parser";

//
import Top from './pages/App';
import About from './pages/about';
//
import Common from './lib/Common';
import commonRouter from './routes/commonRouter';
import userRouter from './routes/userRouter';
//
const app = express();
import 'dotenv/config'
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
console.log("env= ", process.env.NODE_ENV);
const errorObj = {ret: 500 , messase: "Error"};

// route
app.use('/api/common', commonRouter);
app.use('/api/user', userRouter);
//
app.get('/*', (req: any, res: any) => {
  try {
    res.send(renderToString(Top()));
  } catch (error) {
    res.sendStatus(500);
  }
});
//
const PORT = 3000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
console.log('start');

export default app;