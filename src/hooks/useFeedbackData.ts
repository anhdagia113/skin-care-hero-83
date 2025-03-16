
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData, postData } from "@/api/api-client";
import { Feedback } from "@/types";
import { toast } from "sonner";

export function useFeedbackData() {
  return useQuery({
    queryKey: ["feedbackData"],
    queryFn: async () => {
      const response = await fetchData<Feedback[]>("/feedback");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Feedback[];
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    onError: (error) => {
      console.error("Failed to fetch feedback data:", error);
      toast.error("Unable to load feedback. Please try again later.");
    }
  });
}

export function useSubmitFeedback() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (feedbackData: Omit<Feedback, "id">) => {
      const response = await postData<Feedback>("/feedback", feedbackData);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Feedback;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbackData"] });
      toast.success("Thank you for your feedback!");
    },
    onError: (error) => {
      console.error("Failed to submit feedback:", error);
      toast.error("Unable to submit your feedback. Please try again.");
    }
  });
}
