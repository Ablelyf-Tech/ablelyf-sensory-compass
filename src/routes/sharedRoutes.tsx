
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import VideoSession from "@/pages/VideoSession";
import NotFound from "@/pages/NotFound";

export const sharedRoutes = [
  <Route 
    key="dashboard"
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="video-session"
    path="/video-session" 
    element={
      <ProtectedRoute>
        <VideoSession />
      </ProtectedRoute>
    } 
  />,
  
  // Catch-all route
  <Route key="not-found" path="*" element={<NotFound />} />
];
