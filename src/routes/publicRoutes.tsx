
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export const PublicRoutes = () => {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="register" element={currentUser ? <Navigate to="/dashboard" /> : <Register />} />
    </Routes>
  );
};
