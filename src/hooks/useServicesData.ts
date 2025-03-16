
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { Service } from "@/types";
import { toast } from "sonner";

export function useServicesData() {
  return useQuery({
    queryKey: ["servicesData"],
    queryFn: async () => {
      const response = await fetchData<Service[]>("/services");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Service[];
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    onError: (error) => {
      console.error("Failed to fetch services data:", error);
      toast.error("Unable to load services. Please try again later.");
    }
  });
}
