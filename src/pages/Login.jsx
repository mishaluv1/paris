import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e)=>{
    e.preventDefault();

    try{
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/admin");
    }catch{
      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={login} className="p-8 shadow rounded-xl space-y-4 w-80">

        <input
          placeholder="Email"
          className="border p-2 w-full"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full p-2 rounded">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;