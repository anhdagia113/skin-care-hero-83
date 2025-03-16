
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "mobile";
}

const Logo = ({ variant = "default" }: LogoProps) => {
  if (variant === "mobile") {
    return (
      <Link to="/" className="flex items-center space-x-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-md">
          <Sparkles size={16} className="text-white" />
        </div>
        <span className="text-lg font-playfair font-semibold text-purple-700">BeautyGlow</span>
      </Link>
    );
  }

  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-md">
        <Sparkles size={20} className="text-white" />
      </div>
      <span className="text-xl font-playfair font-semibold text-purple-700">BeautyGlow</span>
    </Link>
  );
};

export default Logo;
