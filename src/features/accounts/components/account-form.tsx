import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateAccountModal } from "@/features/accounts/core/hooks";
import { useCreateAccount } from "@/features/accounts/core/services/api/mutations";
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

const AccountForm = ({
  initialValues,
}: {
  initialValues?: { name: string };
}) => {
  const form = useForm<TAccountFormData>({
    resolver: zodResolver(accountsInsertSchema.pick({ name: true })),
    defaultValues: initialValues ?? {
      name: "",
    },
  });
  const { close } = useCreateAccountModal();
  const { mutate: createAccount, isPending } = useCreateAccount();

  const onSubmit = (values: TAccountFormData) => {
    createAccount(
      { json: values },
      {
        onSuccess: () => close(),
      }
    );
  };

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
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {initialValues ? "Edit account" : "Create account"}
        </Button>
      </form>
    </Form>
  );
};

export default AccountForm;
