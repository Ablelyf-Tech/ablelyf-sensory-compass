
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { therapistRoutes } from "./therapistRoutes";
import { caregiverRoutes } from "./caregiverRoutes";
import { teacherRoutes } from "./teacherRoutes";
import { hrRoutes } from "./hrRoutes";
import { adminRoutes } from "./adminRoutes";
import { sharedRoutes } from "./sharedRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Include all routes */}
      {publicRoutes}
      {therapistRoutes}
      {caregiverRoutes}
      {teacherRoutes}
      {hrRoutes}
      {adminRoutes}
      {sharedRoutes}
      
      {/* Catch-all route - redirects to home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
