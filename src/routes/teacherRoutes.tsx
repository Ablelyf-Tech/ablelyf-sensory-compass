
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Classroom from "@/pages/teacher/Classroom";
import ProgressReports from "@/pages/teacher/ProgressReports";
import Materials from "@/pages/teacher/Materials";
import TeacherCalendar from "@/pages/teacher/Calendar";

export const TeacherRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Classroom />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <ProgressReports />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Materials />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <TeacherCalendar />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};
