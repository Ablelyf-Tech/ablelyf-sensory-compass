
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import VideoSession from "@/pages/VideoSession";
import Classroom from "@/pages/teacher/Classroom";
import ProgressReports from "@/pages/teacher/ProgressReports";
import Materials from "@/pages/teacher/Materials";
import TeacherTools from "@/pages/teacher/TeacherTools";
import TeacherCalendar from "@/pages/teacher/Calendar";

export const teacherRoutes = [
  <Route 
    key="dashboard"
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <TeacherLayout>
          <TeacherDashboard />
        </TeacherLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="video-session"
    path="/video-session" 
    element={
      <ProtectedRoute>
        <TeacherLayout>
          <VideoSession />
        </TeacherLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="classroom"
    path="/classroom" 
    element={
      <ProtectedRoute>
        <TeacherLayout>
          <Classroom />
        </TeacherLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="progress"
    path="/progress" 
    element={
      <ProtectedRoute>
        <TeacherLayout>
          <ProgressReports />
        </TeacherLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="materials"
    path="/materials" 
    element={
      <ProtectedRoute>
        <TeacherLayout>
          <Materials />
        </TeacherLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="teacher-tools"
    path="/teacher-tools" 
    element={
      <ProtectedRoute>
        <TeacherLayout>
          <TeacherTools />
        </TeacherLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="teacher-calendar"
    path="/teacher-calendar" 
    element={
      <ProtectedRoute>
        <TeacherLayout>
          <TeacherCalendar />
        </TeacherLayout>
      </ProtectedRoute>
    } 
  />
];
