
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Classroom from "@/pages/teacher/Classroom";
import ProgressReports from "@/pages/teacher/ProgressReports";
import Materials from "@/pages/teacher/Materials";
import TeacherCalendar from "@/pages/teacher/Calendar";
import { Fragment } from "react";

export const TeacherRoutes = () => {
  return (
    <Fragment>
      <Route 
        path="/classroom" 
        element={
          <ProtectedRoute>
            <Classroom />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/progress" 
        element={
          <ProtectedRoute>
            <ProgressReports />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/materials" 
        element={
          <ProtectedRoute>
            <Materials />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/teacher-calendar" 
        element={
          <ProtectedRoute>
            <TeacherCalendar />
          </ProtectedRoute>
        } 
      />
    </Fragment>
  );
};
