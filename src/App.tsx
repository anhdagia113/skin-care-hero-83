
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import SiteNavbar from "@/components/SiteNavbar";
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

// Footer component
const Footer = () => (
  <footer className="bg-gray-100 py-12 mt-16">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">About Us</h3>
          <p className="text-gray-600 text-sm">
            We're dedicated to providing exceptional skincare services tailored to your unique needs.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="/services" className="text-gray-600 hover:text-primary text-sm">Facials</a></li>
            <li><a href="/services" className="text-gray-600 hover:text-primary text-sm">Treatments</a></li>
            <li><a href="/services" className="text-gray-600 hover:text-primary text-sm">Consultations</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Contact</h3>
          <address className="not-italic text-gray-600 text-sm">
            <p>123 Beauty Lane</p>
            <p>Wellness City, WC 12345</p>
            <p className="mt-2">Phone: (123) 456-7890</p>
            <p>Email: hello@skincarebeauty.com</p>
          </address>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Hours</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>Monday - Friday: 9am - 8pm</li>
            <li>Saturday: 10am - 6pm</li>
            <li>Sunday: 10am - 4pm</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Skincare Beauty Center. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default App;
