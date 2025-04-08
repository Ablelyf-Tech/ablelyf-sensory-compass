
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import HRTools from "@/pages/hr/HRTools";

export const hrRoutes = [
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
  />
];
