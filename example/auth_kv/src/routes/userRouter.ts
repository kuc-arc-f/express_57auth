import express from 'express';
const router = express.Router();
import axios from 'axios';

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
console.log("AUTH_USER_MAIL= ", process.env.AUTH_USER_MAIL);
//console.log("AUTH_PASSWORD= ", process.env.AUTH_PASSWORD);
    if(process.env.AUTH_USER_MAIL === body.email
      && process.env.AUTH_PASSWORD === body.password
    ) {
      console.log("OK");
      const url = process.env.KV_URL; 
      const item = {
        api_key: process.env.KV_API_KEY,
        key: "uid:" + String(process.env.AUTH_USER_ID),
        value: "222",
      };
  //console.log(req.body);
//      const path = req.body.api_url;	
//  console.log("path=", url + path);
      const response = await axios.post(url + "/put", item, 
        {headers: { 'Content-Type': 'application/json'}
      });
console.log(response.data);
      retObj.ret = 200;
      const user = {name: body.email};
      req.session.user = user;
      return res.json(retObj)
    }
    retObj.ret = 400;
    return res.json(retObj)
//    req.session._csrf = secret;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
