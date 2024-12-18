import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { TTransactionFormData } from "@/features/transactions/core/types";
import { transactionFormSchema } from "@/features/transactions/core/validations";

import AmountInput from "@/components/amount-input";
import Select from "@/components/select";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertAmountToMiliunits } from "@/lib/utils";

interface ITransactionFormProps {
  initialValues?: TTransactionFormData;
  disabled: boolean;
  categoryOptions: {
    label: string;
    value: string;
  }[];
  accountOptions: {
    label: string;
    value: string;
  }[];
  onSubmit: (values: TTransactionFormData) => void;
  onCreateCategory: (name: string) => void;
  onCreateAccount: (name: string) => void;
  onDelete?: () => void;
}

const TransactionForm = ({
  initialValues,
  disabled,
  categoryOptions,
  accountOptions,
  onCreateCategory,
  onCreateAccount,
  onSubmit,
  onDelete,
}: ITransactionFormProps) => {
  const form = useForm<TTransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      console.info({ initialValues });

      form.setValue("date", initialValues.date);
      form.setValue("amount", initialValues.amount);
      form.setValue("payee", initialValues.payee);
      form.setValue("notes", initialValues.notes);
      form.setValue("categoryId", initialValues.categoryId);
      form.setValue("accountId", initialValues.accountId);
    }
  }, [initialValues, form]);

  const handleSubmit = (values: TTransactionFormData) => {
    const amount = parseFloat(String(values.amount));

    const convertedAmount = convertAmountToMiliunits({ amount });

    onSubmit({
      ...values,
      amount: convertedAmount,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  disabled={disabled}
                  placeholder="There we go"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  options={accountOptions}
                  placeholder="Select an account"
                  value={field.value}
                  disabled={disabled}
                  onChange={field.onChange}
                  onCreate={onCreateAccount}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  options={categoryOptions}
                  placeholder="Select a category"
                  value={field.value}
                  disabled={disabled}
                  onChange={field.onChange}
                  onCreate={onCreateCategory}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Add a payee"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  value={String(field.value)}
                  onChange={(value) => field.onChange(Number(value))}
                  disabled={disabled}
                  placeholder="0.00"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  disabled={disabled}
                  placeholder="Optional notes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={disabled} className="w-full">
          {!!initialValues ? "Edit transaction" : "Create transaction"}
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
            Delete transaction
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TransactionForm;
