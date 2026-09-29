import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { API_BASE_URL } from "../config";

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
    const response = await fetch(`${API_BASE_URL}/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        phone,
        password,
      }),
    });

    const data = await response.json();
    if(response.ok){
      localStorage.setItem("token",data.token);
      localStorage.setItem("customer",JSON.stringify(data.customer));
      navigate("/booking");
    }else{
      console.error(data.message);
    }

    console.log(data);
   }catch(error){
    console.error("Login error", error);
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black-600">
            Olivia
          </h1>

          <p className="text-gray-500 mt-1">
            Bridal & Beauty
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Login to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-black-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-black-400"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black-600 text-black py-3 rounded-lg 
                       font-semibold hover:bg-black-700 transition bg-slate-600"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
        <span className="text-black-600 font-semibold cursor-pointer hover:underline">
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;