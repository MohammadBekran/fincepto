import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.api.categories.$get();

      if (!response.ok) throw new Error("Failed to fetch categories");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export const useGetCategory = ({ categoryId }: { categoryId: string }) => {
  const query = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      const response = await client.api.categories[":categoryId"]["$get"]({
        param: { categoryId },
      });

      if (!response.ok) throw new Error("Failed to fetch category");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
