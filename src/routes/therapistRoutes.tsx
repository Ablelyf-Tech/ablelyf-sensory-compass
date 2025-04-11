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
import AssessmentTools from "@/pages/therapist/tools/AssessmentTools";
import VisualSupports from "@/pages/therapist/tools/VisualSupports";
import MotorSkills from "@/pages/therapist/tools/MotorSkills";
import Communication from "@/pages/therapist/tools/Communication";
import Behavioral from "@/pages/therapist/tools/Behavioral";
import SocialSkills from "@/pages/therapist/tools/SocialSkills";
import SensoryProcessing from "@/pages/therapist/tools/SensoryProcessing";
import CognitiveSkills from "@/pages/therapist/tools/CognitiveSkills";

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
  />,
  
  <Route 
    key="therapy-tools-assessment"
    path="/therapy-tools/assessment" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <AssessmentTools />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-tools-visual"
    path="/therapy-tools/visual" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <VisualSupports />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-tools-motor"
    path="/therapy-tools/motor" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <MotorSkills />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-tools-communication"
    path="/therapy-tools/communication" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <Communication />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-tools-behavioral"
    path="/therapy-tools/behavioral" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <Behavioral />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-tools-social"
    path="/therapy-tools/social" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <SocialSkills />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-tools-sensory"
    path="/therapy-tools/sensory" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <SensoryProcessing />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="therapy-tools-cognitive"
    path="/therapy-tools/cognitive" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <CognitiveSkills />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
];
