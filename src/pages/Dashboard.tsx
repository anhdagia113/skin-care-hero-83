
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Users,
  CreditCard,
  Activity,
  User,
  FileText,
  ShoppingBag,
  Star
} from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useCustomerBookings } from "@/hooks/useCustomerData";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SectionHeader } from "@/components/ui/section-header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }
    
    try {
      // In a real app, you would decode the JWT token to get user info
      // For now, we'll use a simple simulation
      const userInfo = { id: 1, roles: ["USER"] };
      setUserId(userInfo.id);
      setIsAdmin(userInfo.roles.includes("ADMIN"));
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  if (!userId) {
    return (
      <div className="container-custom py-12">
        <LoadingSpinner text="Loading user data..." />
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <SectionHeader 
        title="Dashboard" 
        subtitle={isAdmin ? "Admin Dashboard - Manage your business" : "Welcome to your dashboard"} 
      />
      
      {isAdmin ? <AdminDashboard /> : <UserDashboard userId={userId} />}
    </div>
  );
};

const AdminDashboard = () => {
  const { data, isLoading, error } = useDashboardData();
  
  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard data..." />;
  }
  
  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p className="text-lg">Failed to load dashboard data.</p>
        <p className="text-sm mt-2">Please try again later.</p>
      </div>
    );
  }

  const summaryCards = [
    { 
      title: "Total Revenue", 
      value: data ? `$${data.totalRevenue.toFixed(2)}` : "$0.00", 
      description: "Monthly revenue", 
      icon: <CreditCard className="h-8 w-8 text-pink-500" /> 
    },
    { 
      title: "Total Bookings", 
      value: data?.bookingsCount?.total || 0, 
      description: "All time bookings", 
      icon: <Calendar className="h-8 w-8 text-teal-500" /> 
    },
    { 
      title: "Active Customers", 
      value: 250, // This would come from the backend in a real app
      description: "Repeat customers", 
      icon: <Users className="h-8 w-8 text-indigo-500" /> 
    },
    { 
      title: "Satisfaction Rate", 
      value: "95%", // This would come from the backend in a real app
      description: "Based on reviews", 
      icon: <Activity className="h-8 w-8 text-amber-500" /> 
    },
  ];

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryCards.map((card, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-gray-600">{card.title}</CardTitle>
                  {card.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
                <p className="text-sm text-gray-500">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Revenue by Service</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {data?.revenueByService && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.revenueByService}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="serviceName" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#ff7eb6" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Top Specialists</CardTitle>
            </CardHeader>
            <CardContent>
              {data?.topTherapists && data.topTherapists.map((therapist, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium">{therapist.therapistName}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {therapist.averageRating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{therapist.bookingsCount}</p>
                    <p className="text-sm text-gray-500">bookings</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Service</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.recentBookings && data.recentBookings.map((booking, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3">{booking.id}</td>
                      <td className="py-3">Customer #{booking.customerId}</td>
                      <td className="py-3">Service #{booking.serviceId}</td>
                      <td className="py-3">{new Date(booking.appointmentTime).toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3">${booking.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="bookings">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Booking Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Manage all your appointments and bookings here.</p>
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <FileText className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Booking management interface will be implemented here.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="customers">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">View and manage your customer database.</p>
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <Users className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Customer management interface will be implemented here.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reports">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Reports & Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">View detailed reports and analytics for your business.</p>
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <Activity className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Reports and analytics interface will be implemented here.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const UserDashboard = ({ userId }: { userId: number }) => {
  const { data: bookings, isLoading, error } = useCustomerBookings(userId);
  
  if (isLoading) {
    return <LoadingSpinner text="Loading your bookings..." />;
  }
  
  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p className="text-lg">Failed to load your data.</p>
        <p className="text-sm mt-2">Please try again later.</p>
      </div>
    );
  }
  
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
        <TabsTrigger value="history">Booking History</TabsTrigger>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upcoming" className="space-y-8">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Your Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings && bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 font-medium">Service</th>
                      <th className="pb-3 font-medium">Date & Time</th>
                      <th className="pb-3 font-medium">Specialist</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter((booking: any) => 
                      new Date(booking.appointmentTime) >= new Date() && 
                      booking.status !== 'CANCELLED' && 
                      booking.status !== 'COMPLETED'
                    ).map((booking: any, index: number) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-3">Service #{booking.serviceId}</td>
                        <td className="py-3">{new Date(booking.appointmentTime).toLocaleString()}</td>
                        <td className="py-3">{booking.therapistId ? `Specialist #${booking.therapistId}` : "Not assigned"}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button className="text-xs bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-full transition">
                            Reschedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-16 w-16 text-pink-200 mb-4" />
                <p className="text-gray-500 mb-2">You don't have any upcoming appointments</p>
                <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition">
                  Book an Appointment
                </button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Recommended Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-pink-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center mr-4">
                    <ShoppingBag className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Facial Treatment</h4>
                    <p className="text-sm text-gray-500">Based on your skin profile</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center mr-4">
                    <ShoppingBag className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Hydrating Treatment</h4>
                    <p className="text-sm text-gray-500">Perfect for the current season</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Skin Care Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <h4 className="font-medium text-teal-700 mb-1">Stay Hydrated</h4>
                  <p className="text-sm text-gray-600">Drink at least 8 glasses of water daily for radiant skin.</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <h4 className="font-medium text-teal-700 mb-1">Use Sunscreen</h4>
                  <p className="text-sm text-gray-600">Always apply SPF 30+ sunscreen, even on cloudy days.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="history">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Your Booking History</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings && bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 font-medium">Service</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Specialist</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter((booking: any) => 
                      booking.status === 'COMPLETED' || booking.status === 'CANCELLED'
                    ).map((booking: any, index: number) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-3">Service #{booking.serviceId}</td>
                        <td className="py-3">{new Date(booking.appointmentTime).toLocaleDateString()}</td>
                        <td className="py-3">{booking.therapistId ? `Specialist #${booking.therapistId}` : "N/A"}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3">${booking.amount}</td>
                        <td className="py-3">
                          {booking.status === 'COMPLETED' && (
                            <button className="text-xs bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-full transition">
                              Leave Review
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-16 w-16 text-gray-200 mb-4" />
                <p className="text-gray-500">No booking history yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="profile">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-medium">My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-lg mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-pink-200 flex items-center justify-center mr-6">
                  <User className="h-12 w-12 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium">Jane Doe</h3>
                  <p className="text-gray-500">Member since January 2023</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">PERSONAL INFORMATION</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p>jane.doe@example.com</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p>(123) 456-7890</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                      <p>January 15, 1990</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">SKIN PROFILE</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Skin Type</p>
                      <p>Combination</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Concerns</p>
                      <p>Dryness, Fine Lines</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Allergies</p>
                      <p>None reported</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-6">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition mr-4">
                    Edit Profile
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition">
                    Take Skin Test
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

// Helper function to get the right color class for booking status
const getStatusClass = (status: string) => {
  switch (status) {
    case 'BOOKED':
      return 'bg-blue-100 text-blue-800';
    case 'CHECKED_IN':
      return 'bg-purple-100 text-purple-800';
    case 'IN_PROGRESS':
      return 'bg-amber-100 text-amber-800';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default Dashboard;
