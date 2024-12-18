import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTransactions = () => {
  const params = useSearchParams();

  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  const accountId = params.get("accountId") ?? "";

  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
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
