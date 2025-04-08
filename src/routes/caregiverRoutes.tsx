
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import PatientProfile from "@/pages/caregiver/PatientProfile";
import DailyLog from "@/pages/caregiver/DailyLog";
import Alerts from "@/pages/caregiver/Alerts";
import Calendar from "@/pages/caregiver/Calendar";

export const caregiverRoutes = [
  <Route 
    key="patient-profile"
    path="/patient-profile" 
    element={
      <ProtectedRoute>
        <PatientProfile />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="daily-log"
    path="/daily-log" 
    element={
      <ProtectedRoute>
        <DailyLog />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="alerts"
    path="/alerts" 
    element={
      <ProtectedRoute>
        <Alerts />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="calendar"
    path="/calendar" 
    element={
      <ProtectedRoute>
        <Calendar />
      </ProtectedRoute>
    } 
  />
];
