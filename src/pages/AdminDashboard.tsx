
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  Users,
  CreditCard,
  Activity,
  Search,
  FileText,
  Filter,
  Download,
  PlusCircle
} from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useServicesData } from "@/hooks/useServicesData";
import { useTherapistsData } from "@/hooks/useTherapistsData";
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
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const navigate = useNavigate();

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // In a real app, you would check if the user is an admin
    if (!token) {
      navigate("/login");
      toast.error("You must be logged in to access the admin dashboard");
    }
    
    // This would be done with JWT verification in a real app
    // For demo purposes, we'll just continue
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isAdmin={true} />
      
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-10 w-64 focus:ring-pink-500 focus:border-pink-500" 
              />
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-2">
                <span className="text-pink-700 font-semibold">A</span>
              </div>
              <span className="text-gray-700">Admin</span>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="flex justify-start mb-8 bg-transparent border-b overflow-x-auto w-full">
              <TabsTrigger 
                value="overview" 
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-700 rounded-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="bookings" 
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-700 rounded-none"
              >
                Bookings
              </TabsTrigger>
              <TabsTrigger 
                value="customers" 
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-700 rounded-none"
              >
                Customers
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-700 rounded-none"
              >
                Services
              </TabsTrigger>
              <TabsTrigger 
                value="specialists" 
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-700 rounded-none"
              >
                Specialists
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-700 rounded-none"
              >
                Reports
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>
            
            <TabsContent value="bookings">
              <BookingsTab />
            </TabsContent>
            
            <TabsContent value="customers">
              <CustomersTab />
            </TabsContent>
            
            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>
            
            <TabsContent value="specialists">
              <SpecialistsTab />
            </TabsContent>
            
            <TabsContent value="reports">
              <ReportsTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

const OverviewTab = () => {
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
      value: "250+", // This would come from backend in a real app
      description: "Repeat customers", 
      icon: <Users className="h-8 w-8 text-indigo-500" /> 
    },
    { 
      title: "Satisfaction Rate", 
      value: "95%", // This would come from backend in a real app 
      description: "Based on reviews", 
      icon: <Activity className="h-8 w-8 text-amber-500" /> 
    },
  ];

  // Sample data for pie chart - in a real app would come from backend
  const bookingStatusData = [
    { name: 'Booked', value: data?.bookingsCount?.booked || 0, color: '#3b82f6' },
    { name: 'Completed', value: data?.bookingsCount?.completed || 0, color: '#10b981' },
    { name: 'Cancelled', value: data?.bookingsCount?.cancelled || 0, color: '#ef4444' },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index} className="border shadow-md hover:shadow-lg transition-shadow">
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
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Revenue by Service</CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            {data?.revenueByService && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.revenueByService}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="serviceName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#ec4899" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Bookings by Status</CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} bookings`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Bookings</CardTitle>
          <Button variant="outline" className="text-pink-600 border-pink-200 hover:bg-pink-50">
            View All
          </Button>
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
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.recentBookings && data.recentBookings.length > 0 ? (
                  data.recentBookings.map((booking, index) => (
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
                      <td className="py-3">
                        <button className="text-xs bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-md transition">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500">
                      No recent bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BookingsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Bookings Management</h2>
        <div className="flex items-center space-x-3">
          <Button className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input placeholder="Search by customer name or ID..." />
            <div className="flex space-x-4">
              <Input type="date" className="w-full" />
              <Input type="date" className="w-full" />
            </div>
            <select className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500">
              <option value="">All Statuses</option>
              <option value="BOOKED">Booked</option>
              <option value="CHECKED_IN">Checked In</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 font-medium">Booking ID</th>
                  <th className="py-3 px-4 font-medium">Customer</th>
                  <th className="py-3 px-4 font-medium">Service</th>
                  <th className="py-3 px-4 font-medium">Specialist</th>
                  <th className="py-3 px-4 font-medium">Date & Time</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Payment</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4">#12345</td>
                  <td className="py-4 px-4">Jane Doe</td>
                  <td className="py-4 px-4">Facial Treatment</td>
                  <td className="py-4 px-4">Sarah Johnson</td>
                  <td className="py-4 px-4">Aug 15, 2023 10:00 AM</td>
                  <td className="py-4 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">BOOKED</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">PAID</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="default" className="bg-teal-500 hover:bg-teal-600">Check In</Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="border-b">
                  <td className="py-4 px-4">#12346</td>
                  <td className="py-4 px-4">John Smith</td>
                  <td className="py-4 px-4">Deep Cleansing</td>
                  <td className="py-4 px-4">Michael Brown</td>
                  <td className="py-4 px-4">Aug 16, 2023 2:30 PM</td>
                  <td className="py-4 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">CHECKED_IN</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">PAID</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="default" className="bg-indigo-500 hover:bg-indigo-600">Start Service</Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="border-b">
                  <td className="py-4 px-4">#12347</td>
                  <td className="py-4 px-4">Emily Davis</td>
                  <td className="py-4 px-4">Anti-Aging Treatment</td>
                  <td className="py-4 px-4">Jennifer White</td>
                  <td className="py-4 px-4">Aug 16, 2023 3:00 PM</td>
                  <td className="py-4 px-4">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">IN_PROGRESS</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">PAID</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="default" className="bg-green-500 hover:bg-green-600">Complete</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">Showing 1-3 of 50 entries</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-pink-50">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CustomersTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
        <div className="flex items-center space-x-3">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Customer</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-80">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search customers..." className="pl-10" />
            </div>
            <select className="border rounded-md px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-pink-500">
              <option value="">All Customers</option>
              <option value="new">New Customers</option>
              <option value="returning">Returning Customers</option>
              <option value="vip">VIP Customers</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 font-medium">ID</th>
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Email</th>
                  <th className="py-3 px-4 font-medium">Phone</th>
                  <th className="py-3 px-4 font-medium">Skin Type</th>
                  <th className="py-3 px-4 font-medium">Total Bookings</th>
                  <th className="py-3 px-4 font-medium">Last Visit</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4">#1001</td>
                  <td className="py-4 px-4">Emma Thompson</td>
                  <td className="py-4 px-4">emma.t@example.com</td>
                  <td className="py-4 px-4">(123) 456-7890</td>
                  <td className="py-4 px-4">Combination</td>
                  <td className="py-4 px-4">12</td>
                  <td className="py-4 px-4">Aug 10, 2023</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="default">Edit</Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="border-b">
                  <td className="py-4 px-4">#1002</td>
                  <td className="py-4 px-4">Sophia Rodriguez</td>
                  <td className="py-4 px-4">sophia.r@example.com</td>
                  <td className="py-4 px-4">(456) 789-0123</td>
                  <td className="py-4 px-4">Dry</td>
                  <td className="py-4 px-4">5</td>
                  <td className="py-4 px-4">Aug 12, 2023</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="default">Edit</Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="border-b">
                  <td className="py-4 px-4">#1003</td>
                  <td className="py-4 px-4">James Wilson</td>
                  <td className="py-4 px-4">james.w@example.com</td>
                  <td className="py-4 px-4">(789) 012-3456</td>
                  <td className="py-4 px-4">Oily</td>
                  <td className="py-4 px-4">3</td>
                  <td className="py-4 px-4">Aug 14, 2023</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="default">Edit</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">Showing 1-3 of 120 customers</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-pink-50">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ServicesTab = () => {
  const { data: services, isLoading, error } = useServicesData();
  
  if (isLoading) {
    return <LoadingSpinner text="Loading services data..." />;
  }
  
  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p className="text-lg">Failed to load services data.</p>
        <p className="text-sm mt-2">Please try again later.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Services Management</h2>
        <div className="flex items-center space-x-3">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Service</span>
          </Button>
        </div>
      </div>
      
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 font-medium">ID</th>
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Description</th>
                  <th className="py-3 px-4 font-medium">Duration</th>
                  <th className="py-3 px-4 font-medium">Price</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services && services.length > 0 ? (
                  services.map((service, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-4">{service.id}</td>
                      <td className="py-4 px-4">{service.name}</td>
                      <td className="py-4 px-4 max-w-md truncate">{service.description}</td>
                      <td className="py-4 px-4">{service.durationMinutes} min</td>
                      <td className="py-4 px-4">${service.price.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="destructive">Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      No services found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SpecialistsTab = () => {
  const { data: therapists, isLoading, error } = useTherapistsData();
  
  if (isLoading) {
    return <LoadingSpinner text="Loading specialists data..." />;
  }
  
  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p className="text-lg">Failed to load specialists data.</p>
        <p className="text-sm mt-2">Please try again later.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Specialists Management</h2>
        <div className="flex items-center space-x-3">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Specialist</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists && therapists.length > 0 ? (
          therapists.map((therapist, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-w-3 aspect-h-2 relative">
                  <img 
                    src={therapist.photoUrl || "https://via.placeholder.com/300x200?text=Specialist"} 
                    alt={`${therapist.firstName} ${therapist.lastName}`}
                    className="object-cover w-full h-48" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{therapist.firstName} {therapist.lastName}</h3>
                  <p className="text-pink-600 font-medium mt-1">{therapist.specialization}</p>
                  <p className="text-gray-600 mt-3 line-clamp-3">{therapist.bio}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <div>Email: {therapist.email}</div>
                      <div>Phone: {therapist.phoneNumber}</div>
                    </div>
                    <Button variant="outline">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center py-12 text-gray-500">
            <p className="text-lg">No specialists found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ReportsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option value="revenue">Revenue Report</option>
                <option value="bookings">Bookings Report</option>
                <option value="services">Services Report</option>
                <option value="customer">Customer Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <Input type="date" />
            </div>
          </div>
          <Button className="w-full md:w-auto">Generate Report</Button>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Monthly Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {/* Placeholder for chart */}
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
              <p className="text-gray-500">Revenue trend chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Service Popularity</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {/* Placeholder for chart */}
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
              <p className="text-gray-500">Service popularity chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Saved Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 font-medium">Report Name</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Date Range</th>
                  <th className="py-3 px-4 font-medium">Created</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4">Q2 Revenue Report</td>
                  <td className="py-4 px-4">Revenue</td>
                  <td className="py-4 px-4">Apr 1, 2023 - Jun 30, 2023</td>
                  <td className="py-4 px-4">Jul 5, 2023</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline" className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Customer Acquisition Q2</td>
                  <td className="py-4 px-4">Customer</td>
                  <td className="py-4 px-4">Apr 1, 2023 - Jun 30, 2023</td>
                  <td className="py-4 px-4">Jul 5, 2023</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline" className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
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

export default AdminDashboard;
