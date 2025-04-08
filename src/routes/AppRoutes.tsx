
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
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/*" element={<TherapistRoutes />} />
      <Route path="/*" element={<CaregiverRoutes />} />
      <Route path="/*" element={<TeacherRoutes />} />
      <Route path="/*" element={<SharedRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
