
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export const PublicRoutes = () => {
  const { currentUser } = useAuth();
  
  // Render the appropriate component based on the current path
  const path = window.location.pathname;
  
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  
  if (path === "/login") {
    return <Login />;
  }
  
  if (path === "/register") {
    return <Register />;
  }
  
  return <Navigate to="/login" />;
};
