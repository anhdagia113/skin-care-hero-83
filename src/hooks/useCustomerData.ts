
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData, putData } from "@/api/api-client";
import { Customer, Booking, ProfileUpdateData } from "@/types";
import { toast } from "sonner";

export function useCustomerData(customerId: string | null) {
  return useQuery({
    queryKey: ["customerData", customerId],
    queryFn: async () => {
      if (!customerId) throw new Error("Customer ID is required");
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

export function useCustomerBookings(customerId: string | null) {
  return useQuery({
    queryKey: ["customerBookings", customerId],
    queryFn: async () => {
      if (!customerId) throw new Error("Customer ID is required");
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

export function useUpdateCustomerProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ customerId, profileData }: { customerId: string, profileData: ProfileUpdateData }) => {
      const response = await putData<Customer>(`/customers/${customerId}`, profileData);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Customer;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customerData", variables.customerId] });
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
      toast.error("Unable to update your profile. Please try again.");
    }
  });
}
