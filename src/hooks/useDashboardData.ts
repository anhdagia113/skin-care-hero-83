
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { DashboardData } from "@/types";
import { toast } from "sonner";

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await fetchData<DashboardData>("/dashboard");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as DashboardData;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    onError: (error) => {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Unable to load dashboard data. Please try again later.");
    }
  });
}
