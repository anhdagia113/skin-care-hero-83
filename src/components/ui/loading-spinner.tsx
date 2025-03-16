
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  text?: string;
}

export function LoadingSpinner({ 
  size = 24, 
  className,
  text = "Loading..." 
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 
        className={cn("animate-spin text-primary", className)} 
        size={size} 
      />
      <p className="mt-4 text-muted-foreground">{text}</p>
    </div>
  );
}
