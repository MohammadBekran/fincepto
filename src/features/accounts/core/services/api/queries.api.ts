import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();

      if (!response.ok) throw new Error("Failed to fetch accounts");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export const useGetAccount = ({ accountId }: { accountId: string }) => {
  const query = useQuery({
    queryKey: ["account", accountId],
    queryFn: async () => {
      const response = await client.api.accounts[":accountId"]["$get"]({
        param: { accountId },
      });

      if (!response.ok) throw new Error("Failed to fetch account");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
