
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/api/api-client";
import { SkinTest, Service } from "@/types";

export function useSkinTest() {
  return useMutation({
    mutationFn: async (skinTestData: SkinTest) => {
      const response = await postData<Service[]>("/skin-test", skinTestData);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Service[];
    }
  });
}
