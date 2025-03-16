import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchData } from "@/api/api-client";
import { Booking, DashboardData } from "@/types";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Calendar, Clock, DollarSign, ShoppingBag, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";

const AdminDashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetchData<DashboardData>('/dashboard');
        if (response.data) {
          setDashboardData(response.data);
        } else {
          setError(response.error || "Failed to fetch dashboard data");
          toast.error("Failed to load dashboard data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-1/3" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h1>
        <p className="text-gray-600">Dashboard data could not be loaded</p>
      </div>
    );
  }

  const revenueByService = dashboardData.revenueByService.map(item => ({
    name: item.serviceName,
    value: item.revenue
  }));

  const therapistPerformance = dashboardData.topTherapists.map(item => ({
    name: item.therapistName,
    bookings: item.bookingsCount,
    rating: item.averageRating
  }));

  const monthlyRevenueData = [
    { name: "Jan", month: "Jan", revenue: 4200 },
    { name: "Feb", month: "Feb", revenue: 4800 },
    { name: "Mar", month: "Mar", revenue: 5100 },
    { name: "Apr", month: "Apr", revenue: 5600 },
    { name: "May", month: "May", revenue: 5900 },
    { name: "Jun", month: "Jun", revenue: 6100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-[400px]"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Total Revenue</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">${dashboardData.totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                +2.5% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Total Bookings</p>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">{dashboardData.bookingsCount.total}</p>
              <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                <span className="text-green-500">{dashboardData.bookingsCount.completed} completed</span>
                <span className="text-red-500">{dashboardData.bookingsCount.cancelled} cancelled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Active Bookings</p>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">{dashboardData.bookingsCount.booked}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((dashboardData.bookingsCount.booked / dashboardData.bookingsCount.total) * 100)}% of total bookings
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Top Service</p>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4">
              <p className="text-xl font-bold line-clamp-1">
                {dashboardData.revenueByService[0]?.serviceName || "N/A"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ${dashboardData.revenueByService[0]?.revenue.toFixed(2) || "0"} revenue
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <TabsContent value="overview" className="mt-6 space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service</CardTitle>
                <CardDescription>Top performing services by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={revenueByService}
                  index="name"
                  categories={["value"]}
                  colors={["purple"]}
                  valueFormatter={(value) => `$${value}`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Therapist Performance</CardTitle>
                <CardDescription>Bookings and ratings by therapist</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={therapistPerformance}
                  index="name"
                  categories={["bookings", "rating"]}
                  colors={["purple", "pink"]}
                  valueFormatter={(value) => `${value}`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "overview" && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest appointment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.recentBookings.length > 0 ? (
                  dashboardData.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                      <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Customer #{booking.customerId} - Service #{booking.serviceId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.appointmentTime), "PPP p")} - {booking.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${booking.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.isPaid ? "Paid" : "Unpaid"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4 text-muted-foreground">No recent bookings</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="bookings" className="mt-6 space-y-6">
        {activeTab === "bookings" && (
          <Card>
            <CardHeader>
              <CardTitle>Booking Status Distribution</CardTitle>
              <CardDescription>Current status of all bookings</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-md">
                <PieChart
                  data={[
                    { name: "Booked", value: dashboardData?.bookingsCount.booked || 0 },
                    { name: "Completed", value: dashboardData?.bookingsCount.completed || 0 },
                    { name: "Cancelled", value: dashboardData?.bookingsCount.cancelled || 0 },
                  ]}
                  index="name"
                  category="value"
                  valueFormatter={(value) => `${value} bookings`}
                  colors={["purple", "green", "red"]}
                  className="h-[300px]"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="revenue" className="mt-6 space-y-6">
        {activeTab === "revenue" && (
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={monthlyRevenueData}
                index="name"
                categories={["revenue"]}
                colors={["purple"]}
                valueFormatter={(value) => `$${value}`}
                className="h-[300px]"
              />
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </div>
  );
};

export default AdminDashboardOverview;
