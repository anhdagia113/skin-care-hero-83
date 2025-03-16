
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import SiteNavbar from "@/components/SiteNavbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Specialists from "@/pages/Specialists";
import SkinTest from "@/pages/SkinTest";
import Booking from "@/pages/Booking";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";
import UserDashboardOverview from "@/pages/dashboard/UserDashboardOverview";
import UserProfilePage from "@/pages/dashboard/UserProfilePage";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import AdminDashboardOverview from "@/pages/admin/AdminDashboardOverview";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner position="top-right" expand={true} closeButton richColors />
            <ScrollToTop />
            
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<><SiteNavbar /><main className="pt-16"><Home /></main><Footer /></>} />
              <Route path="/services" element={<><SiteNavbar /><main className="pt-16"><Services /></main><Footer /></>} />
              <Route path="/specialists" element={<><SiteNavbar /><main className="pt-16"><Specialists /></main><Footer /></>} />
              <Route path="/skin-test" element={<><SiteNavbar /><main className="pt-16"><SkinTest /></main><Footer /></>} />
              <Route path="/booking" element={<><SiteNavbar /><main className="pt-16"><Booking /></main><Footer /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* User Dashboard routes */}
              <Route element={<ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_STAFF", "ROLE_ADMIN"]} />}>
                <Route path="/dashboard" element={<UserDashboardLayout />}>
                  <Route index element={<UserDashboardOverview />} />
                  <Route path="bookings" element={<div>My Bookings</div>} />
                  <Route path="bookings/:id" element={<div>Booking Details</div>} />
                  <Route path="history" element={<div>Booking History</div>} />
                  <Route path="payments" element={<div>Payment Information</div>} />
                  <Route path="profile" element={<UserProfilePage />} />
                  <Route path="settings" element={<div>Account Settings</div>} />
                </Route>
              </Route>
              
              {/* Admin Dashboard routes */}
              <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
                <Route path="/admin" element={<AdminDashboardLayout />}>
                  <Route index element={<AdminDashboardOverview />} />
                  <Route path="users" element={<div>Customer Management</div>} />
                  <Route path="staff" element={<div>Staff Management</div>} />
                  <Route path="services" element={<div>Service Management</div>} />
                  <Route path="bookings" element={<div>Booking Management</div>} />
                  <Route path="transactions" element={<div>Transaction History</div>} />
                  <Route path="reports" element={<div>Reports</div>} />
                  <Route path="settings" element={<div>System Settings</div>} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
