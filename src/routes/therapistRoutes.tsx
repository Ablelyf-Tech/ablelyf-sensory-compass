
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Patients from "@/pages/therapist/Patients";
import TherapyPlans from "@/pages/therapist/TherapyPlans";
import Assessments from "@/pages/therapist/Assessments";
import LearningModules from "@/pages/therapist/LearningModules";
import Schedule from "@/pages/therapist/Schedule";

export const TherapistRoutes = () => {
  return (
    <>
      <Route 
        path="/patients" 
        element={
          <ProtectedRoute>
            <Patients />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/therapy-plans" 
        element={
          <ProtectedRoute>
            <TherapyPlans />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/assessments" 
        element={
          <ProtectedRoute>
            <Assessments />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/learning-modules" 
        element={
          <ProtectedRoute>
            <LearningModules />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/schedule" 
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        } 
      />
    </>
  );
};
