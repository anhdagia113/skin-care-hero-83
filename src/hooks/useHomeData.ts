
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { HomePageData } from "@/types";

export function useHomeData() {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const response = await fetchData<HomePageData>("/home");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as HomePageData;
    }
  });
}
