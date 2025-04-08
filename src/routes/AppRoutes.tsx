
import { Routes } from "react-router-dom";
import { PublicRoutes } from "./publicRoutes";
import { TherapistRoutes } from "./therapistRoutes";
import { CaregiverRoutes } from "./caregiverRoutes";
import { TeacherRoutes } from "./teacherRoutes";
import { SharedRoutes } from "./sharedRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      <PublicRoutes />
      <TherapistRoutes />
      <CaregiverRoutes />
      <TeacherRoutes />
      <SharedRoutes />
    </Routes>
  );
};
