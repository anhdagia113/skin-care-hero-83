
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar, 
  History, 
  CreditCard, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import Logo from "../ui/Logo";

const UserDashboardLayout = () => {
  const { logout, userId } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/dashboard/bookings", label: "My Bookings", icon: <Calendar className="h-5 w-5" /> },
    { path: "/dashboard/history", label: "Booking History", icon: <History className="h-5 w-5" /> },
    { path: "/dashboard/payments", label: "Payment Info", icon: <CreditCard className="h-5 w-5" /> },
    { path: "/dashboard/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
    { path: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-sm">
        <Logo variant="mobile" />
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 bg-white flex-shrink-0 flex-col shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <Logo />
        </div>
        <div className="flex-grow p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md ${
                  location.pathname === item.path
                    ? "bg-purple-100 text-purple-600"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <Logo variant="mobile" />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md ${
                    location.pathname === item.path
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
              <button
                className="w-full flex items-center px-4 py-3 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                onClick={() => {
                  toggleMobileMenu();
                  logout();
                }}
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Log Out</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboardLayout;
