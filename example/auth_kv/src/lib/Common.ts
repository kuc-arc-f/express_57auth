
import axios from 'axios';
import buildCommon from './buildCommon';
import path from 'path';

//
const Common = {
  /**
  *
  * @param
  *
  * @return: false= NG
  */   
  validUser: async function (req: any, res: any): any
  {
    try{
      let ret = false;
      const url = process.env.KV_URL;
      //console.log("url=", url);
      const dirPath = process.cwd();
      // 除外処理 : login etc
      console.log('Requested path:', req.path);
      if (req.method !== 'GET') {
        return true;
      }
      if(req.path === "/login"){
        return true;
      }
      let resulte = await buildCommon.validatePath(req.path);
      console.log("resulte=", resulte);
      if(!resulte){
        return true;
      }
      const item = {
        api_key: process.env.KV_API_KEY,
        key: "uid:" + String(process.env.AUTH_USER_ID),
      };
      const response = await axios.post(url + "/get", item, 
        {headers: { 'Content-Type': 'application/json'}
      });
console.log(response.data);
      if(response.data.ret && response.data.ret === "OK"){
        return true;
      }
      // put-KV
      /*
      /*
      const user = req.session.user;
      if(user && user.name){
        console.log("name=", user.name);
        return true;
      }
      */
      return ret;
    } catch (e) {
      console.error(e);
    }    
  },  
  /**
  *
  * @param
  *
  * @return: false= NG
  */   
  validApiKey: function (body: any): any
  {
    try{
      let ret = false;
      const envKey = process.env.API_KEY;
      if(!envKey){
        return true;
      }
//console.log("envKey=", envKey);
      if (!body.external_api_key) {
        return ret;
      }
      if (body.external_api_key !== envKey) {
        return ret;
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
    }    
  },
}
export default Common;
