
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isAdmin?: boolean;
}

export function DashboardSidebar({ isAdmin = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const userMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Calendar, label: "My Appointments", path: "/dashboard/appointments" },
    { icon: User, label: "My Profile", path: "/dashboard/profile" },
    { icon: MessageSquare, label: "My Reviews", path: "/dashboard/reviews" },
  ];
  
  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Calendar, label: "Bookings", path: "/dashboard/bookings" },
    { icon: Users, label: "Customers", path: "/dashboard/customers" },
    { icon: ShoppingBag, label: "Services", path: "/dashboard/services" },
    { icon: User, label: "Specialists", path: "/dashboard/specialists" },
    { icon: MessageSquare, label: "Feedback", path: "/dashboard/feedback" },
    { icon: FileText, label: "Reports", path: "/dashboard/reports" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];
  
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;
  
  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-xl font-semibold text-pink-600">
            {isAdmin ? "Admin Panel" : "My Account"}
          </h2>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors",
                location.pathname === item.path && "bg-pink-50 text-pink-600"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/logout"
          className={cn(
            "flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors",
          )}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
