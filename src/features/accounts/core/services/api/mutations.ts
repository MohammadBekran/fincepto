import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "@/lib/utils";

type TCreateAccountRequest = InferRequestType<typeof client.api.accounts.$post>;
type TCreateAccountResponse = InferResponseType<
  typeof client.api.accounts.$post
>;

export const useCreateAccount = () => {
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
      toast.success("Account created");
    },
    onError: () => {
      toast.error("Failed to create account");
    },
  });

  return mutation;
};
