
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import VideoSession from "@/pages/VideoSession";
import NotFound from "@/pages/NotFound";
import { Fragment } from "react";

export const SharedRoutes = () => {
  return (
    <Fragment>
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/video-session" 
        element={
          <ProtectedRoute>
            <VideoSession />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Fragment>
  );
};
