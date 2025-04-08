
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import PatientProfile from "@/pages/caregiver/PatientProfile";
import DailyLog from "@/pages/caregiver/DailyLog";
import Alerts from "@/pages/caregiver/Alerts";
import Calendar from "@/pages/caregiver/Calendar";
import CaregiverTools from "@/pages/caregiver/CaregiverTools";

export const caregiverRoutes = [
  <Route 
    key="patient-profile"
    path="/patient-profile" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <PatientProfile />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="daily-log"
    path="/daily-log" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <DailyLog />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="alerts"
    path="/alerts" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <Alerts />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="caregiver-tools"
    path="/caregiver-tools" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <CaregiverTools />
        </AppLayout>
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
