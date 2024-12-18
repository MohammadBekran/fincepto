import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "@/lib/utils";

type TCreateAccountRequest = InferRequestType<typeof client.api.accounts.$post>;
type TCreateAccountResponse = InferResponseType<
  typeof client.api.accounts.$post
>;

type TEditAccountRequest = InferRequestType<
  (typeof client.api.accounts)[":accountId"]["$patch"]
>;
type TEditAccountResponse = InferResponseType<
  (typeof client.api.accounts)[":accountId"]["$patch"],
  200
>;

type TBulkDeleteAccountsRequest = InferRequestType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>;
type TBulkDeleteAccountsResponse = InferResponseType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>;

type TDeleteAccountRequest = InferRequestType<
  (typeof client.api.accounts)[":accountId"]["$delete"]
>;
type TDeleteAccountResponse = InferResponseType<
  (typeof client.api.accounts)[":accountId"]["$delete"]
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
    mutationKey: ["bulk-delete-account"],
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
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      toast.success("Accounts deleted");
    },
    onError: () => {
      toast.error("Failed to bulk delete accounts");
    },
  });

  return mutation;
};

export const useEditAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TEditAccountResponse,
    Error,
    TEditAccountRequest
  >({
    mutationKey: ["edit-account"],
    mutationFn: async ({ param, json }) => {
      const response = await client.api.accounts[":accountId"]["$patch"]({
        param,
        json,
      });

      if (!response.ok) throw new Error("Failed to edit account");

      const data = await response.json();

      return data;
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      toast.success("Account edited");
    },
    onError: () => {
      toast.error("Failed to edit account");
    },
  });

  return mutation;
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TDeleteAccountResponse,
    Error,
    TDeleteAccountRequest
  >({
    mutationKey: ["delete-account"],
    mutationFn: async ({ param }) => {
      const response = await client.api.accounts[":accountId"]["$delete"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete account");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      toast.success("Account deleted");
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  return mutation;
};
