import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("customer");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Success dialog
  const [showSuccess, setShowSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        loginType === "customer"
          ? `${API_BASE_URL}/login`
          : `${API_BASE_URL}/admin/login`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          loginType === "customer"
            ? {
                phone,
                password,
              }
            : {
                email: phone,
                password,
              }
        ),
      });

      const data = await response.json();

      if (response.ok) {
        // ================= CUSTOMER LOGIN =================
        if (loginType === "customer") {
          localStorage.setItem(
            "customerToken",
            data.token
          );

          localStorage.setItem(
            "customer",
            JSON.stringify(data.customer)
          );

          // Remove old shared token
          localStorage.removeItem("token");

          // Update navbar login state
          window.dispatchEvent(new Event("authChanged"));

          // Get customer's name
          setLoggedInUser(data.customer.name);

          // Show success dialog
          setShowSuccess(true);
        }

        // ================= ADMIN LOGIN =================
        else {
          localStorage.setItem(
            "adminToken",
            data.token
          );

          localStorage.setItem(
            "admin",
            JSON.stringify(data.admin)
          );

          // Remove old shared token
          localStorage.removeItem("token");

          // Get admin's name
          setLoggedInUser(data.admin.name);

          // Show success dialog
          setShowSuccess(true);
        }
      } else {
        console.error(data.message);
      }

      console.log(data);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);

    if (loginType === "customer") {
      navigate("/");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    
    
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo / Title */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
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

          {/* Customer / Admin */}
          <div className="flex gap-2 mb-6">

            <button
              type="button"
              onClick={() => setLoginType("customer")}
              className={`flex-1 py-2 rounded-lg ${
                loginType === "customer"
                  ? "bg-slate-900 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Customer
            </button>

            <button
              type="button"
              onClick={() => setLoginType("admin")}
              className={`flex-1 py-2 rounded-lg ${
                loginType === "admin"
                  ? "bg-slate-900 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Admin
            </button>

          </div>

          {/* Phone / Email */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              {loginType === "customer"
                ? "Phone Number"
                : "Email"}
            </label>

            <input
              type={loginType === "customer" ? "tel" : "email"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={
                loginType === "customer"
                  ? "Enter your phone number"
                  : "Enter your email"
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-slate-400"
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
                         focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-lg 
                       font-semibold hover:bg-slate-800 transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={()=> navigate("/")}
            className="w-full bg-white text-red-600 py-3 rounded-lg 
                       font-semibold hover:bg-slate-800 transition border border-red-400"
          >
            Cancel
          </button>

          

        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-slate-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

      {/* ================= SUCCESS DIALOG ================= */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

          {/* Blurred Background */}
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-md"></div>

          {/* Dialog */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">

            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center mb-5">
              <span className="text-2xl">
                ✓
              </span>
            </div>

            {/* Small Label */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Olivia Bridal & Beauty
            </p>

            {/* Greeting */}
            <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mt-3">
              Hi, {loggedInUser}!
            </h2>

            {/* Message */}
            <p className="text-sm text-slate-600 leading-6 mt-4">
              You have successfully logged in.
              <br />
              Welcome back to Olivia Bridal & Beauty.
            </p>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleSuccessOk}
              className="mt-7 w-full py-3 bg-slate-900 text-white 
                         text-xs uppercase tracking-[0.25em] 
                         rounded-md hover:bg-slate-800 transition"
            >
              Continue
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Login;