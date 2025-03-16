
import { useServicesData } from "@/hooks/useServicesData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, Sparkles, CalendarDays } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SectionHeader } from "@/components/ui/section-header";
import { HeroSection } from "@/components/ui/hero-section";

const Services = () => {
  const { data: services, isLoading, error } = useServicesData();

  if (isLoading) {
    return <LoadingSpinner size={36} text="Loading our beauty services..." />;
  }

  if (error || !services) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Unable to load services</h1>
          <p className="text-gray-600 mb-4">We're having trouble getting our service information</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        title="Our Beauty Services"
        description="Discover our comprehensive range of skincare treatments designed to enhance your natural beauty and address all your skin concerns."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Transform Your Skin"
            subtitle="Each treatment is personalized to your unique skin type and concerns"
            centered
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="card-hover border-none shadow-sm h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <CardDescription className="flex items-center mt-2 text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" /> 
                        {service.durationMinutes} minutes
                      </CardDescription>
                    </div>
                    <div className="text-lg font-medium text-primary">
                      ${service.price}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Link to={`/services/${service.id}`}>
                    <Button variant="outline" size="sm">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </Link>
                  <Link to={`/booking?serviceId=${service.id}`}>
                    <Button size="sm">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium mb-4">Not sure which treatment is right for you?</h2>
            <p className="mb-8">Take our skin assessment test and get personalized recommendations based on your unique skin profile and concerns.</p>
            <Link to="/skin-test">
              <Button size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Take Skin Test
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
