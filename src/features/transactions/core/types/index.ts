import { Row } from "@tanstack/react-table";
import { z } from "zod";

import { transactionFormSchema } from "@/features/transactions/core/validations";

export type TTransactionFormData = z.input<typeof transactionFormSchema>;

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
