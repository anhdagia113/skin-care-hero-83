
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDashboardData } from '@/hooks/useDashboardData';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const Dashboard = () => {
  const { data, isLoading, error } = useDashboardData();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Format upcoming bookings for display
  const upcomingBookings = data?.upcomingBookings?.map(booking => ({
    ...booking,
    formattedDate: booking.appointmentTime ? 
      format(new Date(booking.appointmentTime), 'MMMM d, yyyy h:mm a') : 
      'Date not available'
  }));

  // Recent transactions data for display
  const recentTransactions = data?.recentTransactions?.slice(0, 5);

  if (isLoading) {
    return (
      <div className="container-custom section-padding flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom section-padding">
        <div className="bg-red-50 p-4 rounded-md">
          <h2 className="text-lg font-medium text-red-800">Unable to load dashboard</h2>
          <p className="text-red-700 mt-1">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your skincare journey.</p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-4">
          <Button>
            Book New Treatment
          </Button>
          <Button variant="outline">
            View Recommendations
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.totalBookings || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +{data?.stats?.newBookings || 0} this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Treatments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.completedTreatments || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data?.stats?.completionRate || 0}% completion rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Loyalty Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.loyaltyPoints || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data?.stats?.pointsToNextReward || 0} until next reward
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${data?.stats?.totalSpent?.toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Over {data?.stats?.totalServices || 0} services
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="treatments">Treatments</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Treatment History</CardTitle>
              <CardDescription>Your skincare journey over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <LineChart 
                data={data?.charts?.treatmentHistory || []} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="treatments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Types</CardTitle>
              <CardDescription>Breakdown of your treatment types</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <BarChart 
                data={data?.charts?.treatmentTypes || []}
                layout="vertical"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="spending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending</CardTitle>
              <CardDescription>Your spending over the past months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <BarChart 
                data={data?.charts?.monthlySpending || []}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Bookings and Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled skincare treatments</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingBookings && upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking, index) => (
                  <div key={booking.id} className="flex items-start justify-between pb-4">
                    <div>
                      <h4 className="font-medium">{booking.serviceName}</h4>
                      <p className="text-sm text-muted-foreground">{booking.formattedDate}</p>
                      <p className="text-sm">With {booking.therapistName}</p>
                    </div>
                    <Button variant="outline" size="sm">Details</Button>
                    {index < upcomingBookings.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No upcoming appointments</p>
                <Button className="mt-4">Book a Treatment</Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your recent payments and refunds</CardDescription>
        </CardHeader>
        <CardContent>
          {recentTransactions && recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between pb-4">
                  <div className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-2 ${transaction.type === 'payment' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <h4 className="font-medium">{transaction.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date ? format(new Date(transaction.date), 'MMM d, yyyy') : 'Date unavailable'}
                      </p>
                    </div>
                  </div>
                  <span className={`font-medium ${transaction.type === 'payment' ? 'text-red-500' : 'text-green-500'}`}>
                    {transaction.type === 'payment' ? '-' : '+'} ${transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No recent transactions</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
