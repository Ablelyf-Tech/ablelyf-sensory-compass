
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import Classroom from "@/pages/teacher/Classroom";
import ProgressReports from "@/pages/teacher/ProgressReports";
import Materials from "@/pages/teacher/Materials";
import TeacherCalendar from "@/pages/teacher/Calendar";
import TeacherTools from "@/pages/teacher/TeacherTools";

export const teacherRoutes = [
  <Route 
    key="classroom"
    path="/classroom" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <Classroom />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="progress"
    path="/progress" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <ProgressReports />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="materials"
    path="/materials" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <Materials />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="teacher-tools"
    path="/teacher-tools" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <TeacherTools />
        </AppLayout>
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
