
import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./publicRoutes";
import { TherapistRoutes } from "./therapistRoutes";
import { CaregiverRoutes } from "./caregiverRoutes";
import { TeacherRoutes } from "./teacherRoutes";
import { SharedRoutes } from "./sharedRoutes";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Public routes (login, register) */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Shared routes for all authenticated users */}
      <Route path="dashboard/*" element={<SharedRoutes />} />
      
      {/* Role-specific routes */}
      <Route path="patients/*" element={<TherapistRoutes />} />
      <Route path="therapy-plans/*" element={<TherapistRoutes />} />
      <Route path="assessments/*" element={<TherapistRoutes />} />
      <Route path="learning-modules/*" element={<TherapistRoutes />} />
      <Route path="schedule/*" element={<TherapistRoutes />} />
      
      <Route path="patient-profile/*" element={<CaregiverRoutes />} />
      <Route path="daily-log/*" element={<CaregiverRoutes />} />
      <Route path="alerts/*" element={<CaregiverRoutes />} />
      <Route path="calendar/*" element={<CaregiverRoutes />} />
      
      <Route path="classroom/*" element={<TeacherRoutes />} />
      <Route path="progress/*" element={<TeacherRoutes />} />
      <Route path="materials/*" element={<TeacherRoutes />} />
      <Route path="teacher-calendar/*" element={<TeacherRoutes />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
