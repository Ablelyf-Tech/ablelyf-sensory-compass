
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export const publicRoutes = [
  <Route key="index" path="/" element={<Index />} />,
  <Route 
    key="login"
    path="/login" 
    element={<Login />}
  />,
  <Route 
    key="register"
    path="/register" 
    element={<Register />}
  />
];
