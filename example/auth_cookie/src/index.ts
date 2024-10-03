
import express from "express";
//const path = require('path');
import { renderToString } from 'react-dom/server';
import cookieParser from "cookie-parser";
import session from "express-session";
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
console.log("APP_NAME= ", process.env.APP_NAME);
console.log("AUTH_USER_ID= ", process.env.AUTH_USER_ID);
console.log("AUTH_EXPIRED_TIME= ", process.env.AUTH_EXPIRED_TIME);
 
// Session
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * Number(process.env.AUTH_EXPIRED_TIME),  // クッキーの有効期限をn-minに設定(msec * sec * min)
    //httpsを使用しない
    secure: false
  }
 }));
//
const errorObj = {ret: 500 , messase: "Error"};
//middleware
app.use(async function(req: any, res: any, next: any){
  const valid = await Common.validUser(req, res);
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
app.get('/*', async(req: any, res: any) => {
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