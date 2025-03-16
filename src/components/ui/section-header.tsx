
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  centered = false, 
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-12", 
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl font-medium text-gray-900 mb-4 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 h-1 w-16 bg-primary rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
