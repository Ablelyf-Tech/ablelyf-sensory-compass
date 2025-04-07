
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import VideoSession from "./pages/VideoSession";

// Therapist Pages
import Patients from "./pages/therapist/Patients";
import TherapyPlans from "./pages/therapist/TherapyPlans";
import Assessments from "./pages/therapist/Assessments";
import LearningModules from "./pages/therapist/LearningModules";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={currentUser ? <Navigate to="/dashboard" /> : <Register />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Video Session route */}
      <Route 
        path="/video-session" 
        element={
          <ProtectedRoute>
            <VideoSession />
          </ProtectedRoute>
        } 
      />
      
      {/* Therapist routes */}
      <Route 
        path="/patients" 
        element={
          <ProtectedRoute>
            <Patients />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/therapy-plans" 
        element={
          <ProtectedRoute>
            <TherapyPlans />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/assessments" 
        element={
          <ProtectedRoute>
            <Assessments />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/learning-modules" 
        element={
          <ProtectedRoute>
            <LearningModules />
          </ProtectedRoute>
        } 
      />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
