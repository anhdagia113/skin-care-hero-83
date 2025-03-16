
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { HomePageData } from "@/types";
import { toast } from "sonner";

export function useHomeData() {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const response = await fetchData<HomePageData>("/home");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as HomePageData;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    onError: (error) => {
      console.error("Failed to fetch home data:", error);
      toast.error("Unable to load home page data. Please try again later.");
    }
  });
}
