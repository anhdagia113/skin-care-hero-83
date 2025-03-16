
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  description?: string;
  children?: ReactNode;
  imageSrc?: string;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
}

export function HeroSection({
  title,
  description,
  children,
  imageSrc,
  className,
  imageClassName,
  contentClassName
}: HeroSectionProps) {
  return (
    <section className={cn(
      "gradient-bg py-20",
      className
    )}>
      <div className="container-custom">
        <div className="md:flex md:items-center md:space-x-10">
          <div className={cn(
            "md:w-1/2 mb-10 md:mb-0",
            contentClassName
          )}>
            <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-gray-600 mb-8">
                {description}
              </p>
            )}
            {children}
          </div>
          {imageSrc && (
            <div className="md:w-1/2">
              <img 
                src={imageSrc} 
                alt={title} 
                className={cn(
                  "rounded-lg shadow-lg w-full object-cover h-[400px]",
                  imageClassName
                )} 
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
