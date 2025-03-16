
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from '@/components/ui/chart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { format } from 'date-fns';
import { Sparkles, Calendar, Clock, CheckCircle, XCircle, DollarSign, Users, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, trend, color = 'bg-primary/10' }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`p-2 rounded-full ${color}`}>{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {trend !== undefined && (
        <div className={`flex items-center text-xs mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
        </div>
      )}
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useDashboardData();
  const [revenueView, setRevenueView] = useState<'weekly' | 'monthly'>('monthly');
  
  if (isLoading) {
    return (
      <div className="container-custom py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="container-custom py-10">
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <h2 className="text-xl font-semibold text-red-500">Error Loading Dashboard</h2>
            <p className="text-muted-foreground mt-2">
              {error || 'Unable to load dashboard data. Please try again later.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Format data for charts
  const revenueData = data.monthlyRevenue.map(item => ({
    name: item.month,
    revenue: item.revenue,
  }));
  
  const bookingStatusData = [
    { name: 'Booked', value: data.bookingsCount.booked },
    { name: 'Completed', value: data.bookingsCount.completed },
    { name: 'Cancelled', value: data.bookingsCount.cancelled },
  ];
  
  const serviceRevenueData = data.revenueByService.map(item => ({
    name: item.serviceName.length > 15 ? `${item.serviceName.substring(0, 15)}...` : item.serviceName,
    revenue: item.revenue,
  }));
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="container-custom py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          {format(new Date(), 'MMMM d, yyyy')}
        </div>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(data.totalRevenue)}
          icon={<DollarSign className="h-4 w-4 text-primary" />}
          trend={8.2}
        />
        <StatCard 
          title="Bookings" 
          value={data.bookingsCount.total}
          description={`${data.bookingsCount.booked} upcoming`}
          icon={<Calendar className="h-4 w-4 text-indigo-500" />}
          color="bg-indigo-100"
          trend={12.5}
        />
        <StatCard 
          title="Completion Rate" 
          value={`${Math.round((data.bookingsCount.completed / (data.bookingsCount.total - data.bookingsCount.booked)) * 100)}%`}
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          color="bg-green-100"
          trend={1.8}
        />
        <StatCard 
          title="Average Service" 
          value={formatCurrency(data.totalRevenue / data.bookingsCount.completed)}
          icon={<Sparkles className="h-4 w-4 text-purple-500" />}
          color="bg-purple-100"
          trend={-2.3}
        />
      </div>
      
      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <Tabs defaultValue="monthly" onValueChange={(v) => setRevenueView(v as 'weekly' | 'monthly')}>
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              {revenueView === 'monthly' ? 'Monthly revenue for the past year' : 'Weekly revenue for the past quarter'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: any) => formatCurrency(value)}
                  labelFormatter={(label) => `${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
            <CardDescription>
              Breakdown of current bookings by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingStatusData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  formatter={(value: any) => [`${value} bookings`, ""]}
                  labelFormatter={(label) => `Status: ${label}`}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                >
                  {bookingStatusData.map((entry, index) => {
                    const colors = ["hsl(var(--primary))", "#10b981", "#f43f5e"];
                    return <rect key={`rect-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service</CardTitle>
            <CardDescription>
              Top services by revenue generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceRevenueData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: any) => formatCurrency(value)}
                  labelFormatter={(label) => `Service: ${label}`}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Latest booking activity in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentBookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center border-b pb-2">
                  <div className={`p-2 rounded-full mr-4 ${
                    booking.status === "COMPLETED" ? "bg-green-100" : 
                    booking.status === "CANCELLED" ? "bg-red-100" : "bg-blue-100"
                  }`}>
                    {booking.status === "COMPLETED" ? <CheckCircle className="h-4 w-4 text-green-500" /> : 
                     booking.status === "CANCELLED" ? <XCircle className="h-4 w-4 text-red-500" /> : 
                     <Clock className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Service #{booking.serviceId}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(booking.appointmentTime), 'MMM d, yyyy, h:mm a')}
                    </p>
                  </div>
                  <div className="font-medium">
                    {formatCurrency(booking.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
