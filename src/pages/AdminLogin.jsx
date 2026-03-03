import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin(){

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();
 const logout = ()=>{
  localStorage.removeItem("admin");
  window.location.href="/";
 }

 const login = ()=>{

   if(email === "paris@gmail.com" && password === "8606337533"){
     localStorage.setItem("admin","true");
     navigate("/admin/dashboard");
   }else{
     alert("Invalid Login");
   }

 }

 return(
   <div className="h-screen flex justify-center items-center">

     <div className="p-10 shadow rounded w-96">

       <h1 className="text-2xl font-bold mb-5">
         Admin Login
       </h1>

       <input 
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={e=>setEmail(e.target.value)}
       />

       <input 
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={e=>setPassword(e.target.value)}
       />

       <button 
        onClick={login}
        className="bg-black text-white w-half p-3 rounded"
       >
        Login
       </button>
        <button 
        onClick={logout}
        className=" text-black w-half p-3 float-right rounded"
       >
        Home
       </button>

     </div>

   </div>
 )

}

export default AdminLogin;