import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      console.error("Registration error:", error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">

          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Olivia Bridal & Beauty
          </p>

          <h1 className="text-3xl font-serif text-slate-900 mt-3">
            Create Account
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Create your account to book salon services.
          </p>

        </div>


        {/* Registration Card */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-slate-300 px-4 py-3 rounded-md
                           text-sm text-slate-700
                           focus:outline-none
                           focus:border-slate-900
                           focus:ring-1 focus:ring-slate-900"
              />
            </div>


            {/* Phone */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="07XXXXXXXX"
                className="w-full border border-slate-300 px-4 py-3 rounded-md
                           text-sm text-slate-700
                           focus:outline-none
                           focus:border-slate-900
                           focus:ring-1 focus:ring-slate-900"
              />
            </div>


            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-slate-300 px-4 py-3 rounded-md
                           text-sm text-slate-700
                           focus:outline-none
                           focus:border-slate-900
                           focus:ring-1 focus:ring-slate-900"
              />
            </div>


            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-slate-300 px-4 py-3 rounded-md
                           text-sm text-slate-700
                           focus:outline-none
                           focus:border-slate-900
                           focus:ring-1 focus:ring-slate-900"
              />
            </div>


            {/* Confirm Password */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full border border-slate-300 px-4 py-3 rounded-md
                           text-sm text-slate-700
                           focus:outline-none
                           focus:border-slate-900
                           focus:ring-1 focus:ring-slate-900"
              />
            </div>


            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 px-4 py-3 rounded-md">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}


            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-200 px-4 py-3 rounded-md">
                <p className="text-sm text-green-600">
                  {success}
                </p>
              </div>
            )}


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-md
                         text-xs uppercase tracking-[0.2em]
                         font-medium
                         transition-all duration-300
                         hover:bg-slate-800
                         disabled:opacity-50
                         disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>


          {/* Login Link */}
          <div className="text-center mt-6">

            <p className="text-sm text-slate-500">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="inline-block mt-2 text-xs uppercase
                         tracking-[0.2em] text-slate-800
                         hover:underline"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;