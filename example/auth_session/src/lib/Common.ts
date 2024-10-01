//require('dotenv').config();
//
const Common = {
  /**
  *
  * @param
  *
  * @return: false= NG
  */   
  validUser: function (req: any): any
  {
    try{
      let ret = false;
      // 除外処理 : login etc
      console.log('Requested path:', req.path);
      if (req.method !== 'GET') {
        return true;
      }
      if(req.path === "/login"){
        return true;
      }
      const user = req.session.user;
      if(user && user.name){
        console.log("name=", user.name);
        return true;
      }
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
