import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import OtpPage from "./pages/OtpPage";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/otp" element={<OtpPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </UserProvider>
  );
};

export default App;
