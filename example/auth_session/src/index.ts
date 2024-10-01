
import express from "express";
//const path = require('path');
import { renderToString } from 'react-dom/server';
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStoreModule from 'session-file-store';
const FileStore = FileStoreModule(session);

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
app.use(session({
  store: new FileStore({ path: './sessions', secret: 'your-secret-key' }), // FileStoreを設定
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60} // クッキーの有効期限を1時間に設定(msec * sec * min)
}));
console.log("env= ", process.env.NODE_ENV);
const errorObj = {ret: 500 , messase: "Error"};
//middleware
app.use(function(req: any, res: any, next: any){
  const body = req.body;
console.log(body);
  const valid = Common.validUser(req);
  //API

  //screen
  if(!valid) {
    console.log("nothing, user-session");
    res.redirect('/login');
  } else {
    next();
  }
});
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