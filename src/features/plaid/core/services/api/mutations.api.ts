import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "@/lib/utils";

type TCreateLinkTokenResponse = InferResponseType<
  (typeof client.api.plaid)["create-link-token"]["$post"],
  200
>;

type TExchangePublicTokenRequest = InferRequestType<
  (typeof client.api.plaid)["exchange-public-token"]["$post"]
>;
type TExchangePublicTokenResponse = InferResponseType<
  (typeof client.api.plaid)["exchange-public-token"]["$post"],
  200
>;

export const useCreateLinkToken = () => {
  const mutation = useMutation<TCreateLinkTokenResponse, Error>({
    mutationKey: ["create-link-token"],
    mutationFn: async () => {
      const response = await client.api.plaid["create-link-token"]["$post"]();

      if (!response.ok) throw new Error("Failed to create link token");

      return await response.json();
    },
    onSuccess: () => toast.success("Link token created"),
    onError: () => toast.error("Failed to create link token"),
  });

  return mutation;
};

export const useExchangePublicToken = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TExchangePublicTokenResponse,
    Error,
    TExchangePublicTokenRequest
  >({
    mutationKey: ["exchange-public-token"],
    mutationFn: async ({ json }) => {
      const response = await client.api.plaid["exchange-public-token"]["$post"](
        { json }
      );

      if (!response.ok) throw new Error("Failed to exchange public token");

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["connected-bank"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success("Public token exchanged");
    },
    onError: () => toast.error("Failed to exchange public token"),
  });

  return mutation;
};

export const useDeleteConnectedBank = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-connected-bank"],
    mutationFn: async () => {
      const response = await client.api.plaid["connected-bank"]["$delete"]();

      if (!response.ok) throw new Error("Failed to delete connected bank");

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["connected-bank"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success("Connected bank deleted");
    },
    onError: () => toast.error("Failed to delete connected bank"),
  });

  return mutation;
};
