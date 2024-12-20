import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "@/lib/utils";

type TCreateCategoryRequest = InferRequestType<
  typeof client.api.categories.$post
>;
type TCreateCategoryResponse = InferResponseType<
  typeof client.api.categories.$post
>;

type TEditCategoryRequest = InferRequestType<
  (typeof client.api.categories)[":categoryId"]["$patch"]
>;
type TEditCategoryResponse = InferResponseType<
  (typeof client.api.categories)[":categoryId"]["$patch"],
  200
>;

type TBulkDeleteCategoriesRequest = InferRequestType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>;
type TBulkDeleteCategoriesResponse = InferResponseType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>;

type TDeleteCategoryRequest = InferRequestType<
  (typeof client.api.categories)[":categoryId"]["$delete"]
>;
type TDeleteCategoryResponse = InferResponseType<
  (typeof client.api.categories)[":categoryId"]["$delete"]
>;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TCreateCategoryResponse,
    Error,
    TCreateCategoryRequest
  >({
    mutationKey: ["create-category"],
    mutationFn: async ({ json }) => {
      const response = await client.api.categories.$post({ json });

      if (!response.ok) throw new Error("Failed to create Category");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Category created");
    },
    onError: () => {
      toast.error("Failed to create Category");
    },
  });

  return mutation;
};

export const useBulkDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TBulkDeleteCategoriesResponse,
    Error,
    TBulkDeleteCategoriesRequest
  >({
    mutationKey: ["bulk-delete-category"],
    mutationFn: async ({ json }) => {
      const response = await client.api.categories["bulk-delete"]["$post"]({
        json,
      });

      if (!response.ok) throw new Error("Failed to bulk delete categories");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Categories deleted");
    },
    onError: () => {
      toast.error("Failed to bulk delete categories");
    },
  });

  return mutation;
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TEditCategoryResponse,
    Error,
    TEditCategoryRequest
  >({
    mutationKey: ["edit-category"],
    mutationFn: async ({ param, json }) => {
      const response = await client.api.categories[":categoryId"]["$patch"]({
        param,
        json,
      });

      if (!response.ok) throw new Error("Failed to edit category");

      const data = await response.json();

      return data;
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["categories", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Category edited");
    },
    onError: () => {
      toast.error("Failed to edit category");
    },
  });

  return mutation;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TDeleteCategoryResponse,
    Error,
    TDeleteCategoryRequest
  >({
    mutationKey: ["delete-category"],
    mutationFn: async ({ param }) => {
      const response = await client.api.categories[":categoryId"]["$delete"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete category");

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      toast.success("Category deleted");
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });

  return mutation;
};
