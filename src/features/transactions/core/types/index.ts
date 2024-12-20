import { Row } from "@tanstack/react-table";
import { InferResponseType } from "hono";
import { z } from "zod";

import { transactionFormSchema } from "@/features/transactions/core/validations";

import { client } from "@/lib/hono";

export type TTransactionFormData = z.input<typeof transactionFormSchema>;

export type TTransactionResponse = InferResponseType<
  typeof client.api.transactions.$get,
  200
>["data"][1];

export type TTransactionRow = Row<{
  id: string;
  amount: number;
  payee: string;
  notes: string | null;
  date: string;
  account: string;
  accountId: string | null;
  category: string | null;
  categoryId: string | null;
}>[];
