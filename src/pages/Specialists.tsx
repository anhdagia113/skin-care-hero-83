
import { useTherapistsData } from "@/hooks/useTherapistsData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Specialists = () => {
  const { data: therapists, isLoading, error } = useTherapistsData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading specialists...</p>
        </div>
      </div>
    );
  }

  if (error || !therapists) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error loading specialists</h1>
          <p className="text-gray-600 mb-4">Please try again later</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-r from-purple-100 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Specialists</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet our team of expert skincare specialists dedicated to providing you with personalized treatments and care.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapists.map((therapist) => (
              <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={therapist.photoUrl || "/placeholder.svg"} 
                    alt={`${therapist.firstName} ${therapist.lastName}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{therapist.firstName} {therapist.lastName}</CardTitle>
                  <CardDescription>{therapist.specialization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-4">{therapist.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to={`/specialists/${therapist.id}`}>
                    <Button variant="outline">View Profile</Button>
                  </Link>
                  <Link to={`/booking?therapistId=${therapist.id}`}>
                    <Button>Book Session</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specialists;
