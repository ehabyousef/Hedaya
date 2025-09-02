// src/components/ProtectedRoute.js
import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/auth" />;
  }

  try {
    const decoded = jwtDecode(token);
    if (!decoded.isAdmin && allowedRole !== "admin") {
      return <Navigate to="/home" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/auth" />;
  }

  return children;
}
