import express from 'express';
const router = express.Router();
//require('dotenv').config();
//import axios from 'axios';
//import todoData from './todoData';

/**
* 
* @param
*
* @return
*/ 
router.post('/login', async function(req: any, res: any) {
  const retObj = {ret: 500, message: ""};
  try {
    if(!req.body){
      throw new Error("nothing, body");
    }
    const body = req.body;
console.log(req.body);
console.log("AUTH_USER= ", process.env.AUTH_USER);
console.log("AUTH_PASSWORD= ", process.env.AUTH_PASSWORD);
    if(process.env.AUTH_USER === body.email
      && process.env.AUTH_PASSWORD === body.password
    ) {
      console.log("OK");
      retObj.ret = 200;
      const user = {name: body.email};
      req.session.user = user;
      return res.json(retObj)
    }
    return res.json(retObj)
//    req.session._csrf = secret;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
