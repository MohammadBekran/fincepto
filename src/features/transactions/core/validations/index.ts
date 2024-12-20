import { z } from "zod";

export const transactionFormSchema = z.object({
  amount: z.number(),
  payee: z.string(),
  notes: z.string().nullable(),
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string(),
});
