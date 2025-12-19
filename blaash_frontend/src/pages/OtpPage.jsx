import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const { setPlaylists } = useAuth();

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("/verify-otp", { email, otp });
      if (response.status === 200 || response.status === 201) {
        // 2. If login/signup is successful, the backend returns the user object
        // Let's call your fetch function but wait for it
        await fetchUserDetails();

        // 3. Navigate to dashboard
        console.log("Verification successful, navigating...");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("/login", { email });
      alert("OTP resent");
    } catch (error) {
      alert(error.response.data.message || "Failed to resend OTP");
    }
  };

  const fetchUserDetails = async () => {
    try {
      const email = localStorage.getItem("email"); // Double check email exists
      if (!email) return;

      const userResponse = await axios.get(`/user/${email}`);

      if (userResponse.data && userResponse.data.playlists) {
        setPlaylists(userResponse.data.playlists);
      }
    } catch (error) {
      console.error("Data fetch error:", error);
      // Don't alert here if you don't want to block navigation
    }
  };

  return (
    <div className="form-container bg-[#1c1c23] w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center bg-[#27272f] p-16 rounded-2xl gap-4">
        <h2 className="font-bold text-3xl text-white">Verify OTP</h2>
        <p className="text-white">OTP sent to: {email}</p>
        <input
          className="w-[250px] h-[40px] p-3 rounded-md"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="flex flex-col w-full gap-5">
          <button
            className="bg-[#5a5a68] text-white p-3 rounded-sm hover:opacity-80 active:opacity-70"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
          <button
            className="bg-[#5a5a68] text-white p-3 rounded-sm hover:opacity-80 active:opacity-70"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
