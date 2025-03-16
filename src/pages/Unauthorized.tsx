
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-50 p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-lg text-gray-600">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Button onClick={() => navigate(-1)}>Go Back</Button>
          <Button onClick={() => navigate("/")} variant="outline">Go to Home</Button>
          <Button onClick={logout} variant="destructive">Log Out</Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
