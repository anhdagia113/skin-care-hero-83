
import { useTherapistsData } from "@/hooks/useTherapistsData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SectionHeader } from "@/components/ui/section-header";
import { HeroSection } from "@/components/ui/hero-section";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, Phone, Star } from "lucide-react";

const Specialists = () => {
  const { data: therapists, isLoading, error } = useTherapistsData();

  if (isLoading) {
    return <LoadingSpinner size={36} text="Loading our beauty specialists..." />;
  }

  if (error || !therapists) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Unable to load specialists</h1>
          <p className="text-gray-600 mb-4">We're having trouble getting our specialist information</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        title="Our Beauty Specialists"
        description="Meet our team of expert skincare specialists dedicated to providing you with personalized treatments and care."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Expert Care for Your Skin"
            subtitle="Our specialists are certified professionals with years of experience in skincare treatments"
            centered
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {therapists.map((therapist) => (
              <Card key={therapist.id} className="card-hover border-none shadow-sm overflow-hidden h-full flex flex-col">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={therapist.photoUrl || "/placeholder.svg"} 
                    alt={`${therapist.firstName} ${therapist.lastName}`} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{therapist.firstName} {therapist.lastName}</CardTitle>
                      <CardDescription className="text-primary font-medium">{therapist.specialization}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Expert
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 line-clamp-3 text-sm mb-4">{therapist.bio}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <Mail className="h-3.5 w-3.5 mr-2" />
                      {therapist.email}
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-3.5 w-3.5 mr-2" />
                      {therapist.phoneNumber}
                    </p>
                    <p className="flex items-center">
                      <CalendarDays className="h-3.5 w-3.5 mr-2" />
                      {therapist.workSchedule}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Link to={`/specialists/${therapist.id}`}>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </Link>
                  <Link to={`/booking?therapistId=${therapist.id}`}>
                    <Button size="sm">Book Session</Button>
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
            <h2 className="text-2xl font-medium mb-4">Your Beauty Journey Starts Here</h2>
            <p className="mb-8">Schedule an appointment with one of our specialists and take the first step toward healthier, more radiant skin.</p>
            <Link to="/booking">
              <Button size="lg">
                <CalendarDays className="mr-2 h-4 w-4" />
                Book an Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specialists;
