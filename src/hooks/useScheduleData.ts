
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { toast } from "sonner";

export function useScheduleData() {
  return useQuery({
    queryKey: ["scheduleData"],
    queryFn: async () => {
      const response = await fetchData<Record<string, string>>("/schedule");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch schedule data:", error);
        toast.error("Unable to load schedule data. Please try again later.");
      }
    }
  });
}
