
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { therapistRoutes } from "./therapistRoutes";
import { caregiverRoutes } from "./caregiverRoutes";
import { teacherRoutes } from "./teacherRoutes";
import { sharedRoutes } from "./sharedRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect from index to diagnostic tools */}
      <Route path="/" element={<Navigate to="/diagnostic-tools" replace />} />
      
      {/* Include all routes */}
      {publicRoutes}
      {therapistRoutes}
      {caregiverRoutes}
      {teacherRoutes}
      {sharedRoutes}
    </Routes>
  );
};
