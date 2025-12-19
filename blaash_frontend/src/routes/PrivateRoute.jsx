import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const  userEmail  = localStorage.getItem("email");
  return userEmail ? children : <Navigate to="/" />;
};

export default PrivateRoute;
