
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PageTemplate } from "@/components/shared/PageTemplate";
import UserManagement from "@/pages/admin/UserManagement";
import SystemMetrics from "@/pages/admin/SystemMetrics";
import Certifications from "@/pages/admin/Certifications";
import SystemSettings from "@/pages/admin/SystemSettings";

export const adminRoutes = [
  <Route 
    key="users"
    path="/users" 
    element={
      <ProtectedRoute>
        <UserManagement />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="metrics"
    path="/metrics" 
    element={
      <ProtectedRoute>
        <SystemMetrics />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="certifications"
    path="/certifications" 
    element={
      <ProtectedRoute>
        <Certifications />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="settings"
    path="/settings" 
    element={
      <ProtectedRoute>
        <SystemSettings />
      </ProtectedRoute>
    } 
  />
];
