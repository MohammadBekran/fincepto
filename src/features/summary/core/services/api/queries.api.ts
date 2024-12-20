import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/core/hooks";
import { client } from "@/lib/hono";

export const useGetSummary = () => {
  const [filters] = useFilters();

  const { from, to, accountId } = filters;

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from: from ? String(from) : undefined,
          to: to ? String(to) : undefined,
          accountId: accountId ? accountId : undefined,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch summary");

      return response.json();
    },
  });

  return query;
};
