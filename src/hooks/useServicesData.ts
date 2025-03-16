
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api-client";
import { Service } from "@/types";

export function useServicesData() {
  return useQuery({
    queryKey: ["servicesData"],
    queryFn: async () => {
      const response = await fetchData<Service[]>("/services");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Service[];
    }
  });
}
