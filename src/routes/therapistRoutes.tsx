
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Patients from "@/pages/therapist/Patients";
import TherapyPlans from "@/pages/therapist/TherapyPlans";
import Assessments from "@/pages/therapist/Assessments";
import LearningModules from "@/pages/therapist/LearningModules";
import Schedule from "@/pages/therapist/Schedule";

export const TherapistRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Patients />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <TherapyPlans />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Assessments />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <LearningModules />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};
