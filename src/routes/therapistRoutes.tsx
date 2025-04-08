
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import Patients from "@/pages/therapist/Patients";
import TherapyPlans from "@/pages/therapist/TherapyPlans";
import Assessments from "@/pages/therapist/Assessments";
import LearningModules from "@/pages/therapist/LearningModules";
import Schedule from "@/pages/therapist/Schedule";
import DiagnosticTools from "@/pages/therapist/DiagnosticTools";
import TherapyTools from "@/pages/therapist/TherapyTools";
import TherapyModules from "@/pages/therapist/TherapyModules";
import TherapyToolsLibrary from "@/pages/therapist/TherapyToolsLibrary";

export const therapistRoutes = [
  <Route 
    key="patients"
    path="/patients" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <Patients />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-plans"
    path="/therapy-plans" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <TherapyPlans />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="assessments"
    path="/assessments" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <Assessments />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="diagnostic-tools"
    path="/diagnostic-tools" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <DiagnosticTools />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-tools"
    path="/therapy-tools" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <TherapyTools />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-modules"
    path="/therapy-modules" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <TherapyModules />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-tools-library"
    path="/therapy-tools-library" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <TherapyToolsLibrary />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="learning-modules"
    path="/learning-modules" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <LearningModules />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="schedule"
    path="/schedule" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <Schedule />
        </AppLayout>
      </ProtectedRoute>
    } 
  />
];
