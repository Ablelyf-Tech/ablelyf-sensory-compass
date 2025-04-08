
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes } from "./publicRoutes";
import { TherapistRoutes } from "./therapistRoutes";
import { CaregiverRoutes } from "./caregiverRoutes";
import { TeacherRoutes } from "./teacherRoutes";
import { SharedRoutes } from "./sharedRoutes";
import { AppLayout } from "@/components/layout/AppLayout";
import DiagnosticTools from "@/pages/therapist/DiagnosticTools";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect from index to diagnostic tools */}
      <Route path="/" element={<Navigate to="/diagnostic-tools" replace />} />
      
      {/* Wrap all protected routes with AppLayout */}
      <Route path="/" element={<AppLayout><DiagnosticTools /></AppLayout>} />
      
      <PublicRoutes />
      <TherapistRoutes />
      <CaregiverRoutes />
      <TeacherRoutes />
      <SharedRoutes />
    </Routes>
  );
};
