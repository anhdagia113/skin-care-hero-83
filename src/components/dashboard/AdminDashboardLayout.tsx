
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  Briefcase, 
  CalendarRange, 
  CreditCard, 
  FileBarChart2, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

const AdminDashboardLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/admin", label: "Overview", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/admin/users", label: "Customers", icon: <Users className="h-5 w-5" /> },
    { path: "/admin/staff", label: "Staff", icon: <UserCog className="h-5 w-5" /> },
    { path: "/admin/services", label: "Services", icon: <Briefcase className="h-5 w-5" /> },
    { path: "/admin/bookings", label: "Bookings", icon: <CalendarRange className="h-5 w-5" /> },
    { path: "/admin/transactions", label: "Transactions", icon: <CreditCard className="h-5 w-5" /> },
    { path: "/admin/reports", label: "Reports", icon: <FileBarChart2 className="h-5 w-5" /> },
    { path: "/admin/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-sm">
        <Link to="/" className="text-xl font-semibold text-purple-600">Admin Panel</Link>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div 
        className={`hidden md:flex bg-white flex-col shadow-sm transition-all duration-300 ${
          sidebarCollapsed ? "md:w-20" : "md:w-64"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!sidebarCollapsed && (
            <Link to="/" className="text-xl font-semibold text-purple-600">Admin Panel</Link>
          )}
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-md text-gray-500 hover:bg-gray-100 ${
              sidebarCollapsed ? "mx-auto" : ""
            }`}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
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
                } ${sidebarCollapsed ? "justify-center" : ""}`}
              >
                {item.icon}
                {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className={`flex items-center text-gray-700 hover:bg-purple-50 hover:text-purple-600 ${
              sidebarCollapsed ? "justify-center w-10 h-10 p-0" : "w-full justify-start"
            }`}
            onClick={logout}
          >
            <LogOut className={`h-5 w-5 ${sidebarCollapsed ? "" : "mr-3"}`} />
            {!sidebarCollapsed && "Log Out"}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <Link to="/" className="text-xl font-semibold text-purple-600">Admin Panel</Link>
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

export default AdminDashboardLayout;
