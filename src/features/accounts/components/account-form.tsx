import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { TAccountFormData } from "@/features/accounts/core/types";

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
import { accountsInsertSchema } from "@/db/schema";

interface IAccountFormProps {
  initialValues?: { id: string; name: string };
  disabled: boolean;
  onSubmit: (values: TAccountFormData) => void;
  onDelete?: () => void;
}

const AccountForm = ({
  initialValues,
  disabled,
  onSubmit,
  onDelete,
}: IAccountFormProps) => {
  const form = useForm<TAccountFormData>({
    resolver: zodResolver(accountsInsertSchema.pick({ name: true })),
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
                  placeholder="e.g. Cash, Bank, Credit Card"
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={disabled} className="w-full">
          {!!initialValues ? "Edit account" : "Create account"}
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
            Delete account
          </Button>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
