
import ClientUtil from './lib/ClientUtil';
import HttpCommon from "./lib/HttpCommon";
//
export default function Home() {
  //
  const procLogout = async function(){
    //location.reload();
    try {
      console.log("#procLogout");
      //const values = ClientUtil.getInputValue("form1"); 
      //console.log(values);
      const json = await HttpCommon.post({}, "/api/user/logout");
      console.log(json);
      if(json.ret !== 200){
        alert("Error, Logout");
      }else{
        alert("OK, Logout");
        location.href = '/';
      }
    } catch (e) {
      console.error(e);
    } 
  }
  //
  return (
    <>
    <div className="main_body_wrap container mx-auto my-2 px-8 bg-white">
      {/* navi */}
      {/* items */}
      <div className="logout_btn_wrap">
        <button onClick={()=>procLogout()}>Logout</button>
      </div>

      <hr className="my-2" />
      <h1 className="text-4xl font-bold">home</h1>
      <hr className="my-2" />
    </div>
    <style>{`
    .logout_btn_wrap{text-align : right;}
    `}</style>
    
  </>
  )
}
