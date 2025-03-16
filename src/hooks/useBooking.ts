
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/api/api-client";
import { Booking } from "@/types";

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (bookingData: Omit<Booking, "id">) => {
      const response = await postData<Booking>("/bookings", bookingData);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Booking;
    }
  });
}
