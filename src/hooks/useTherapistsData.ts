
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { Therapist } from "@/types";
import { toast } from "sonner";

export function useTherapistsData() {
  return useQuery({
    queryKey: ["therapistsData"],
    queryFn: async () => {
      const response = await fetchData<Therapist[]>("/therapists");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Therapist[];
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch therapists data:", error);
        toast.error("Unable to load specialists. Please try again later.");
      }
    }
  });
}
