import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { TCategoryFormData } from "@/features/categories/core/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categoriesInsertSchema } from "@/db/schema";

interface ICategoryFormProps {
  initialValues?: { id: string; name: string };
  disabled: boolean;
  onSubmit: (values: TCategoryFormData) => void;
  onDelete?: () => void;
}

const CategoryForm = ({
  initialValues,
  disabled,
  onSubmit,
  onDelete,
}: ICategoryFormProps) => {
  const form = useForm<TCategoryFormData>({
    resolver: zodResolver(categoriesInsertSchema.pick({ name: true })),
    defaultValues: initialValues ?? {
      name: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.setValue("name", initialValues.name);
    }
  }, [initialValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Food, Travel, etc."
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={disabled} className="w-full">
          {!!initialValues ? "Edit category" : "Create category"}
        </Button>
        {initialValues && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={disabled}
            onClick={onDelete}
          >
            <Trash className="size-4" />
            Delete category
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CategoryForm;
