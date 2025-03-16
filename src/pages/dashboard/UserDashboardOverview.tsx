
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import { fetchData } from "@/api/api-client";
import { Booking, Customer } from "@/types";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const UserDashboardOverview = () => {
  const { userId } = useAuth();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        if (userId) {
          const customerResponse = await fetchData<Customer>(`/customers/${userId}`);
          if (customerResponse.data) {
            setCustomer(customerResponse.data);
          } else {
            setError(customerResponse.error || "Failed to fetch profile data");
          }

          const bookingsResponse = await fetchData<Booking[]>(`/customers/${userId}/bookings`);
          if (bookingsResponse.data) {
            // Filter for upcoming bookings (status BOOKED or CHECKED_IN)
            const upcoming = bookingsResponse.data.filter(booking => 
              ['BOOKED', 'CHECKED_IN'].includes(booking.status) && 
              new Date(booking.appointmentTime) > new Date()
            ).sort((a, b) => 
              new Date(a.appointmentTime).getTime() - new Date(b.appointmentTime).getTime()
            );
            setUpcomingBookings(upcoming);
          } else {
            setError(bookingsResponse.error || "Failed to fetch bookings");
          }
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        toast.error("Failed to load your dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          <Skeleton className="h-9 w-3/4" />
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome, {customer?.firstName || "Guest"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{upcomingBookings.length}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {upcomingBookings.length === 0 
                ? "No upcoming appointments" 
                : upcomingBookings.length === 1 
                  ? "You have 1 upcoming appointment" 
                  : `You have ${upcomingBookings.length} upcoming appointments`}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <>
                <p className="text-xl font-medium">
                  {format(new Date(upcomingBookings[0].appointmentTime), "MMM dd, yyyy")}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {format(new Date(upcomingBookings[0].appointmentTime), "h:mm a")}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">No appointments scheduled</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {customer ? "80%" : "0%"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {customer 
                ? "Complete your skin profile for better recommendations" 
                : "Create your profile to get started"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your next scheduled treatments</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="border rounded-md p-4 flex justify-between items-center">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          Service #{booking.serviceId}
                        </h4>
                        <p className="text-sm text-gray-500">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {format(new Date(booking.appointmentTime), "MMM dd, yyyy h:mm a")}
                        </p>
                        <p className="text-sm text-gray-500">
                          <Users className="h-3 w-3 inline mr-1" />
                          Therapist #{booking.therapistId || "Not assigned"}
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/dashboard/bookings/${booking.id}`}>View Details</Link>
                    </Button>
                  </div>
                ))}
                {upcomingBookings.length > 3 && (
                  <div className="text-center mt-4">
                    <Button asChild variant="ghost">
                      <Link to="/dashboard/bookings">View All Appointments</Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">You don't have any upcoming appointments</p>
                <Button asChild>
                  <Link to="/booking">Book an Appointment</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Services</CardTitle>
            <CardDescription>Based on your skin profile and history</CardDescription>
          </CardHeader>
          <CardContent>
            {customer?.skinType ? (
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium">Hydrating Facial</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Perfect for {customer.skinType} skin type. Your skin profile shows you may benefit from extra hydration.
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-3">
                    <Link to="/booking">Book Now</Link>
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium">Seasonal Skin Treatment</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Recommended for your concerns: {customer.skinConcerns}
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-3">
                    <Link to="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">Complete your skin profile to get personalized recommendations</p>
                <Button asChild>
                  <Link to="/skin-test">Take Skin Quiz</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardOverview;
