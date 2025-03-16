
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { toast } from "sonner";

export function usePaymentPolicy() {
  return useQuery({
    queryKey: ["paymentPolicy"],
    queryFn: async () => {
      const response = await fetchData<Record<string, any>>("/payment-policy");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    onError: (error) => {
      console.error("Failed to fetch payment policy:", error);
      toast.error("Unable to load payment policy. Please try again later.");
    }
  });
}
