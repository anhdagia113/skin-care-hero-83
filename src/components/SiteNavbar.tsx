
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Calendar, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Logo from "./ui/Logo";

const SiteNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/services" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Services
              </Link>
              <Link to="/specialists" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Specialists
              </Link>
              <Link to="/skin-test" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Skin Test
              </Link>
              <Link to="/blog" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Blog
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link to="/booking">
              <Button className="mr-2">Book Appointment</Button>
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {isAdmin() && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    {isStaff() ? "Staff Dashboard" : "My Dashboard"}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                    Profile Settings
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate("/dashboard/bookings")}>
                    My Bookings
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="icon" onClick={() => navigate("/login")}>
                <LogIn className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="bg-purple-50 border-purple-500 text-purple-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/services" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link to="/specialists" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Specialists
            </Link>
            <Link to="/skin-test" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Skin Test
            </Link>
            <Link to="/blog" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/booking" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Book Appointment
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link to="/login" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SiteNavbar;
