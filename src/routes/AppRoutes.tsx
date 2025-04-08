
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes } from "./publicRoutes";
import { TherapistRoutes } from "./therapistRoutes";
import { CaregiverRoutes } from "./caregiverRoutes";
import { TeacherRoutes } from "./teacherRoutes";
import { SharedRoutes } from "./sharedRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect from index to diagnostic tools */}
      <Route path="/" element={<Navigate to="/diagnostic-tools" replace />} />
      
      {/* Include all route groups */}
      <PublicRoutes />
      <TherapistRoutes />
      <CaregiverRoutes />
      <TeacherRoutes />
      <SharedRoutes />
    </Routes>
  );
};
