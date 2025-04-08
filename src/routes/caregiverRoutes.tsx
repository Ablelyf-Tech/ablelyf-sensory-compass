
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import PatientProfile from "@/pages/caregiver/PatientProfile";
import DailyLog from "@/pages/caregiver/DailyLog";
import Alerts from "@/pages/caregiver/Alerts";
import Calendar from "@/pages/caregiver/Calendar";

export const CaregiverRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <PatientProfile />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/daily-log" 
        element={
          <ProtectedRoute>
            <DailyLog />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/alerts" 
        element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/calendar" 
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};
