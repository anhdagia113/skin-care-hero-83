
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { DashboardData } from "@/types";
import { toast } from "sonner";

// Mock data for development purposes
const mockDashboardData: DashboardData = {
  totalRevenue: 12560.75,
  bookingsCount: {
    total: 125,
    booked: 42,
    completed: 78,
    cancelled: 5
  },
  revenueByService: [
    { serviceId: 1, serviceName: "Hydrating Facial", revenue: 4250.50, bookingsCount: 32 },
    { serviceId: 2, serviceName: "Deep Cleansing", revenue: 3800.25, bookingsCount: 28 },
    { serviceId: 3, serviceName: "Anti-Aging Treatment", revenue: 2560.00, bookingsCount: 15 },
    { serviceId: 4, serviceName: "Acne Treatment", revenue: 1950.00, bookingsCount: 18 }
  ],
  topTherapists: [
    { therapistId: 1, therapistName: "Emma Johnson", bookingsCount: 45, averageRating: 4.8 },
    { therapistId: 2, therapistName: "Sophia Lee", bookingsCount: 38, averageRating: 4.7 },
    { therapistId: 3, therapistName: "Michael Chen", bookingsCount: 32, averageRating: 4.9 }
  ],
  recentBookings: [
    { 
      id: 101, 
      customerId: 1, 
      serviceId: 1, 
      therapistId: 1, 
      appointmentTime: "2023-06-15T14:00:00Z", 
      duration: 60, 
      status: "COMPLETED", 
      amount: 120, 
      isPaid: true,
      createdAt: "2023-06-10T09:30:00Z", 
      updatedAt: "2023-06-15T15:10:00Z"
    },
    { 
      id: 102, 
      customerId: 2, 
      serviceId: 2, 
      therapistId: 2, 
      appointmentTime: "2023-06-16T11:00:00Z", 
      duration: 45, 
      status: "COMPLETED", 
      amount: 85, 
      isPaid: true,
      createdAt: "2023-06-12T14:20:00Z", 
      updatedAt: "2023-06-16T12:05:00Z"
    },
    { 
      id: 103, 
      customerId: 3, 
      serviceId: 3, 
      therapistId: 1, 
      appointmentTime: "2023-06-18T15:30:00Z", 
      duration: 90, 
      status: "BOOKED", 
      amount: 150, 
      isPaid: false,
      createdAt: "2023-06-14T10:45:00Z", 
      updatedAt: "2023-06-14T10:45:00Z"
    }
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 1850.00 },
    { month: "Feb", revenue: 2100.50 },
    { month: "Mar", revenue: 1920.75 },
    { month: "Apr", revenue: 2340.25 },
    { month: "May", revenue: 2780.00 },
    { month: "Jun", revenue: 1570.25 }
  ],
  // Additional properties for Dashboard.tsx
  upcomingBookings: [
    {
      id: 201,
      serviceId: 1,
      serviceName: "Hydrating Facial",
      appointmentTime: "2023-06-25T14:00:00Z",
      therapistName: "Emma Johnson",
      status: "BOOKED"
    },
    {
      id: 202,
      serviceId: 3,
      serviceName: "Anti-Aging Treatment",
      appointmentTime: "2023-06-28T16:30:00Z",
      therapistName: "Michael Chen",
      status: "BOOKED"
    }
  ],
  recentTransactions: [
    {
      id: 301,
      amount: 120,
      date: "2023-06-15T15:10:00Z",
      description: "Hydrating Facial",
      type: "payment"
    },
    {
      id: 302,
      amount: 85,
      date: "2023-06-16T12:05:00Z",
      description: "Deep Cleansing",
      type: "payment"
    },
    {
      id: 303,
      amount: 45,
      date: "2023-06-14T09:20:00Z",
      description: "Product Purchase Refund",
      type: "refund"
    }
  ],
  stats: {
    totalBookings: 125,
    newBookings: 18,
    completedTreatments: 78,
    completionRate: 92,
    loyaltyPoints: 450,
    pointsToNextReward: 50,
    totalSpent: 1350.75,
    totalServices: 15
  },
  charts: {
    treatmentHistory: [
      { name: "Jan", value: 8 },
      { name: "Feb", value: 10 },
      { name: "Mar", value: 7 },
      { name: "Apr", value: 12 },
      { name: "May", value: 15 },
      { name: "Jun", value: 9 }
    ],
    treatmentTypes: [
      { name: "Hydrating Facial", value: 32 },
      { name: "Deep Cleansing", value: 28 },
      { name: "Anti-Aging Treatment", value: 15 },
      { name: "Acne Treatment", value: 18 },
      { name: "LED Therapy", value: 12 }
    ],
    monthlySpending: [
      { name: "Jan", value: 120 },
      { name: "Feb", value: 180 },
      { name: "Mar", value: 150 },
      { name: "Apr", value: 210 },
      { name: "May", value: 250 },
      { name: "Jun", value: 190 }
    ]
  }
};

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      // Try to fetch from API first
      try {
        const response = await fetchData<DashboardData>("/dashboard");
        if (response.error) {
          console.log("Using mock data due to API error:", response.error);
          return mockDashboardData;
        }
        return response.data || mockDashboardData;
      } catch (error) {
        console.log("Using mock data due to exception:", error);
        return mockDashboardData;
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Unable to load dashboard data. Please try again later.");
      }
    }
  });
}
