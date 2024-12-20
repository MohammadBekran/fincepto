import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "@/lib/utils";

type TCreateTransactionRequest = InferRequestType<
  typeof client.api.transactions.$post
>;
type TCreateTransactionResponse = InferResponseType<
  typeof client.api.transactions.$post
>;

type TBulkCreateTransactionsRequest = InferRequestType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>;
type TBulkCreateTransactionsResponse = InferResponseType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>;

type TEditTransactionRequest = InferRequestType<
  (typeof client.api.transactions)[":transactionId"]["$patch"]
>;
type TEditTransactionResponse = InferResponseType<
  (typeof client.api.transactions)[":transactionId"]["$patch"],
  200
>;

type TBulkDeleteTransactionsRequest = InferRequestType<
  (typeof client.api.transactions)["bulk-delete"]["$post"]
>;
type TBulkDeleteTransactionsResponse = InferResponseType<
  (typeof client.api.transactions)["bulk-delete"]["$post"]
>;

type TDeleteTransactionRequest = InferRequestType<
  (typeof client.api.transactions)[":transactionId"]["$delete"]
>;
type TDeleteTransactionResponse = InferResponseType<
  (typeof client.api.transactions)[":transactionId"]["$delete"]
>;

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TCreateTransactionResponse,
    Error,
    TCreateTransactionRequest
  >({
    mutationKey: ["create-transaction"],
    mutationFn: async ({ json }) => {
      const response = await client.api.transactions.$post({ json });

      if (!response.ok) throw new Error("Failed to create Transaction");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Transaction created");
    },
    onError: () => {
      toast.error("Failed to create transaction");
    },
  });

  return mutation;
};

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TBulkCreateTransactionsResponse,
    Error,
    TBulkCreateTransactionsRequest
  >({
    mutationKey: ["bulk-create-transactions"],
    mutationFn: async ({ json }) => {
      const response = await client.api.transactions["bulk-create"]["$post"]({
        json,
      });

      if (!response.ok) throw new Error("Failed to create transactions");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Transaction created");
    },
    onError: () => {
      toast.error("Failed to create transactions");
    },
  });

  return mutation;
};

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TBulkDeleteTransactionsResponse,
    Error,
    TBulkDeleteTransactionsRequest
  >({
    mutationKey: ["bulk-delete-transaction"],
    mutationFn: async ({ json }) => {
      const response = await client.api.transactions["bulk-delete"]["$post"]({
        json,
      });

      if (!response.ok) throw new Error("Failed to bulk delete transactions");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Transactions deleted");
    },
    onError: () => {
      toast.error("Failed to bulk delete transactions");
    },
  });

  return mutation;
};

export const useEditTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TEditTransactionResponse,
    Error,
    TEditTransactionRequest
  >({
    mutationKey: ["edit-transaction"],
    mutationFn: async ({ param, json }) => {
      const response = await client.api.transactions[":transactionId"][
        "$patch"
      ]({
        param,
        json,
      });

      if (!response.ok) throw new Error("Failed to edit transaction");

      const data = await response.json();

      return data;
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Transaction edited");
    },
    onError: () => {
      toast.error("Failed to edit transaction");
    },
  });

  return mutation;
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TDeleteTransactionResponse,
    Error,
    TDeleteTransactionRequest
  >({
    mutationKey: ["delete-transaction"],
    mutationFn: async ({ param }) => {
      const response = await client.api.transactions[":transactionId"][
        "$delete"
      ]({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete transaction");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Transaction deleted");
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });

  return mutation;
};
