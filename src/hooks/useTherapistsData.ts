
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { Therapist } from "@/types";

export function useTherapistsData() {
  return useQuery({
    queryKey: ["therapistsData"],
    queryFn: async () => {
      const response = await fetchData<Therapist[]>("/therapists");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Therapist[];
    }
  });
}
