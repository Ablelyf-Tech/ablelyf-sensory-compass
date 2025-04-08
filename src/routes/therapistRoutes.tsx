
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import Patients from "@/pages/therapist/Patients";
import TherapyPlans from "@/pages/therapist/TherapyPlans";
import Assessments from "@/pages/therapist/Assessments";
import LearningModules from "@/pages/therapist/LearningModules";
import Schedule from "@/pages/therapist/Schedule";
import DiagnosticTools from "@/pages/therapist/DiagnosticTools";
import { Fragment } from "react";

export const TherapistRoutes = () => {
  return (
    <Fragment>
      <Route 
        path="/patients" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Patients />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/therapy-plans" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <TherapyPlans />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/assessments" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Assessments />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/diagnostic-tools" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <DiagnosticTools />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/learning-modules" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <LearningModules />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/schedule" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Schedule />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
    </Fragment>
  );
};
