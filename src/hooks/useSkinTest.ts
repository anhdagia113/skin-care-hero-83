
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/api/api-client";
import { SkinTest, Service } from "@/types";
import { toast } from "sonner";

export function useSkinTest() {
  return useMutation({
    mutationFn: async (skinTestData: SkinTest) => {
      const response = await postData<Service[]>("/skin-test", skinTestData);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Service[];
    },
    onSuccess: () => {
      toast.success("Skin test submitted successfully!");
    },
    onError: (error) => {
      console.error("Failed to submit skin test:", error);
      toast.error("Unable to process your skin test. Please try again.");
    }
  });
}
