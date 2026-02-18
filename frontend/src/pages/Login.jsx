import React, { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", form);

    console.log("Response:", res.data); // debug

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      console.log("Stored token:", localStorage.getItem("token"));
    }

    alert(res.data.message);

    setForm({
      email: "",
      password: "",
    });
// redirect to home after 1 sec 
setTimeout(()=>{
    navigate("/")
},1000)

  } catch (error) {
    console.log("Login error:", error);
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            New user?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-semibold hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
