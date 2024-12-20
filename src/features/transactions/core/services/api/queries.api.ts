import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useFilters } from "@/core/hooks";

export const useGetTransactions = () => {
  const [filters] = useFilters();

  const { from, to, accountId } = filters;

  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from: from ? String(from) : undefined,
          to: to ? String(to) : undefined,
          accountId: accountId ? accountId : undefined,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch transactions");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export const useGetTransaction = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const query = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      const response = await client.api.transactions[":transactionId"]["$get"]({
        param: { transactionId },
      });

      if (!response.ok) throw new Error("Failed to fetch transaction");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
