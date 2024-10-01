//import Head from '../components/Head'
import ClientUtil from './lib/ClientUtil';
import HttpCommon from "./lib/HttpCommon";
//
function Page() {
  //
  const procLogin = async function(){
    //location.reload();
    try {
      console.log("#cbFunc");
      const values = ClientUtil.getInputValue("form1"); 
      console.log(values);
      const json = await HttpCommon.post(values, "/api/user/login");
      console.log(json);
      if(json.ret !== 200){
        alert("Error, Login");
      }else{
        alert("OK");
        location.href = '/';
      }
    } catch (e) {
      console.error(e);
    } 
  }
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <h1 className="text-4xl text-gray-700 font-bold my-2"
    >Login</h1>
    <hr />
    <div class="form-group" id="form1">
      <label for="">email :</label>
      <input type="text" className="form-control" defaultValue=""
      id="email" name="email" />
      <hr />
      <label for="">password :</label>
      <input type="password" className="form-control" 
      defaultValue="" id="password" name="password" />
      <hr />
      <button onClick={()=>procLogin()}>Login</button>
    </div>
  </div>
  )
}

export default Page;