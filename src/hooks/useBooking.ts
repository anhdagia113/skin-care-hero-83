
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData, putData, deleteData } from "@/api/api-client";
import { Booking } from "@/types";
import { toast } from "sonner";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: Omit<Booking, "id">) => {
      const response = await postData<Booking>("/bookings", bookingData);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Booking;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customerBookings"] });
      toast.success("Booking created successfully!");
    },
    onError: (error) => {
      console.error("Failed to create booking:", error);
      toast.error("Unable to create your booking. Please try again.");
    }
  });
}

export function useProcessPayment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ bookingId, paymentData }: { bookingId: number, paymentData: any }) => {
      const response = await postData<Booking>(`/bookings/${bookingId}/payment`, paymentData);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerBookings"] });
      toast.success("Payment processed successfully!");
    },
    onError: (error) => {
      console.error("Failed to process payment:", error);
      toast.error("Unable to process your payment. Please try again.");
    }
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ bookingId, reason }: { bookingId: number, reason: string }) => {
      const response = await deleteData<Booking>(`/bookings/${bookingId}?reason=${encodeURIComponent(reason)}`);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerBookings"] });
      toast.success("Booking cancelled successfully.");
    },
    onError: (error) => {
      console.error("Failed to cancel booking:", error);
      toast.error("Unable to cancel your booking. Please try again.");
    }
  });
}

export function useCheckInBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingId: number) => {
      const response = await putData<Booking>(`/bookings/${bookingId}/checkin`, {});
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerBookings"] });
      toast.success("Check-in completed successfully!");
    },
    onError: (error) => {
      console.error("Failed to check in:", error);
      toast.error("Unable to complete check-in. Please try again.");
    }
  });
}

export function useCheckOutBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingId: number) => {
      const response = await putData<Booking>(`/bookings/${bookingId}/checkout`, {});
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerBookings"] });
      toast.success("Check-out completed successfully!");
    },
    onError: (error) => {
      console.error("Failed to check out:", error);
      toast.error("Unable to complete check-out. Please try again.");
    }
  });
}

export function useAssignTherapist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ bookingId, therapistId }: { bookingId: number, therapistId: number }) => {
      const response = await putData<Booking>(`/bookings/${bookingId}/assign`, { therapistId });
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerBookings"] });
      toast.success("Therapist assigned successfully!");
    },
    onError: (error) => {
      console.error("Failed to assign therapist:", error);
      toast.error("Unable to assign therapist. Please try again.");
    }
  });
}

export function useRecordServiceResults() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ bookingId, results }: { bookingId: number, results: string }) => {
      const response = await putData<Booking>(`/bookings/${bookingId}/result`, { serviceResults: results });
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerBookings"] });
      toast.success("Service results recorded successfully!");
    },
    onError: (error) => {
      console.error("Failed to record service results:", error);
      toast.error("Unable to record service results. Please try again.");
    }
  });
}
