
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import HRTools from "@/pages/hr/HRTools";
import EmployeeProfiles from "@/pages/hr/EmployeeProfiles";
import AccommodationPlans from "@/pages/hr/AccommodationPlans";
import InclusivityMetrics from "@/pages/hr/InclusivityMetrics";
import Training from "@/pages/hr/Training";

export const hrRoutes = [
  <Route 
    key="employees"
    path="/employees" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <EmployeeProfiles />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="accommodations"
    path="/accommodations" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <AccommodationPlans />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="hr-tools"
    path="/hr-tools" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <HRTools />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="inclusivity"
    path="/inclusivity" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <InclusivityMetrics />
        </AppLayout>
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="training"
    path="/training" 
    element={
      <ProtectedRoute>
        <AppLayout>
          <Training />
        </AppLayout>
      </ProtectedRoute>
    } 
  />
];
