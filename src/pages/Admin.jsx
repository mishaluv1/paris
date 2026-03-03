import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin(){

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

 const login = ()=>{

  if(email==="paris@gmail.com" && password==="8606337533"){
   localStorage.setItem("admin","true");
   navigate("/admin/dashboard");
  }else{
   alert("Invalid Login");
  }

 }

 return(
  <div className="h-screen flex justify-center items-center">

   <div className="shadow p-10 w-96">

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
     className="bg-black text-white w-full p-3"
    >
     Login
    </button>

   </div>

  </div>
 )
}

export default AdminLogin;