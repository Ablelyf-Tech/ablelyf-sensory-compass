
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Classroom from "@/pages/teacher/Classroom";
import ProgressReports from "@/pages/teacher/ProgressReports";
import Materials from "@/pages/teacher/Materials";
import TeacherCalendar from "@/pages/teacher/Calendar";

export const teacherRoutes = [
  <Route 
    key="classroom"
    path="/classroom" 
    element={
      <ProtectedRoute>
        <Classroom />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="progress"
    path="/progress" 
    element={
      <ProtectedRoute>
        <ProgressReports />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="materials"
    path="/materials" 
    element={
      <ProtectedRoute>
        <Materials />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="teacher-calendar"
    path="/teacher-calendar" 
    element={
      <ProtectedRoute>
        <TeacherCalendar />
      </ProtectedRoute>
    } 
  />
];
