
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { Customer, Booking } from "@/types";
import { toast } from "sonner";

export function useCustomerData(customerId: number) {
  return useQuery({
    queryKey: ["customerData", customerId],
    queryFn: async () => {
      const response = await fetchData<Customer>(`/customers/${customerId}`);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Customer;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch customer data:", error);
        toast.error("Unable to load customer information. Please try again later.");
      }
    },
    enabled: !!customerId
  });
}

export function useCustomerBookings(customerId: number) {
  return useQuery({
    queryKey: ["customerBookings", customerId],
    queryFn: async () => {
      const response = await fetchData<Booking[]>(`/customers/${customerId}/bookings`);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Booking[];
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch customer bookings:", error);
        toast.error("Unable to load booking history. Please try again later.");
      }
    },
    enabled: !!customerId
  });
}
