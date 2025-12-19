import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserEmail } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post("/login", { email, password });
      localStorage.setItem("email", email);
      setUserEmail(email);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.message || "Login failed");
    }
  };

  return (
    <div className="form-container bg-[#1c1c23] w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center bg-[#27272f] p-16 rounded-2xl gap-4">
        <h2 className="font-bold text-3xl text-white">Login</h2>
        <div className="flex flex-col gap-4 mt-5">
          <input
            className="w-[250px] h-[40px] p-3 rounded-md"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-[250px] h-[40px] p-3 rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-[#5a5a68] text-white p-3 rounded-sm hover:opacity-80 active:opacity-70"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <p className="text-gray-400">
          Don’t have an account?{" "}
          <a className="text-white underline" href="/signup">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
