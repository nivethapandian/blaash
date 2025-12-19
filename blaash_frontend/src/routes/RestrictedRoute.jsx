import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const RestrictedRoute = ({ children }) => {
  const { userEmail } = useUser();
  return !userEmail ? children : <Navigate to="/dashboard" />;
};

export default RestrictedRoute;
