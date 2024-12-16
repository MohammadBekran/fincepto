import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "@/lib/utils";

type TCreateAccountRequest = InferRequestType<typeof client.api.accounts.$post>;
type TCreateAccountResponse = InferResponseType<
  typeof client.api.accounts.$post
>;

type TBulkDeleteAccountsRequest = InferRequestType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>;
type TBulkDeleteAccountsResponse = InferResponseType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>;

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TCreateAccountResponse,
    Error,
    TCreateAccountRequest
  >({
    mutationKey: ["create-account"],
    mutationFn: async ({ json }) => {
      const response = await client.api.accounts.$post({ json });

      if (!response.ok) throw new Error("Failed to create account");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });

      toast.success("Account created");
    },
    onError: () => {
      toast.error("Failed to create account");
    },
  });

  return mutation;
};

export const useBulkDeleteAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TBulkDeleteAccountsResponse,
    Error,
    TBulkDeleteAccountsRequest
  >({
    mutationKey: ["delete-account"],
    mutationFn: async ({ json }) => {
      const response = await client.api.accounts["bulk-delete"]["$post"]({
        json,
      });

      if (!response.ok) throw new Error("Failed to bulk delete accounts");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });

      toast.success("Accounts deleted");
    },
    onError: () => {
      toast.error("Failed to bulk delete accounts");
    },
  });

  return mutation;
};
