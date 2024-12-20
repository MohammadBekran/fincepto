import { subDays, parse } from "date-fns";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import {
  transactions,
  categories,
  accounts,
  transactionsInsertSchema,
} from "@/db/schema";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(),
    zValidator(
      "query",
      z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        accountId: z.string().optional(),
      })
    ),
    async (c) => {
      const { from, to, accountId } = c.req.valid("query");
      const auth = getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const defaultTo = new Date();
      const defaultFrom = subDays(defaultTo, 30);

      const startDate = from
        ? parse(from, "yyyy-MM-dd", new Date())
        : defaultFrom;
      const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

      const {
        id,
        amount,
        payee,
        notes,
        date,
        accountId: transactionAccountId,
        categoryId,
      } = transactions;

      const data = await db
        .select({
          id,
          amount,
          payee,
          notes,
          date,
          account: accounts.name,
          accountId: transactionAccountId,
          category: categories.name,
          categoryId,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(
          and(
            accountId ? eq(transactions.accountId, accountId) : undefined,
            eq(accounts.userId, auth.userId),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate)
          )
        )
        .orderBy(desc(transactions.date));

      return c.json({ data });
    }
  )
  .get("/:transactionId", clerkMiddleware(), async (c) => {
    const { transactionId } = c.req.param();
    const auth = getAuth(c);

    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    if (!transactionId)
      return c.json({ error: "TransactionId is required" }, 400);

    const { id, amount, payee, notes, date, accountId, categoryId } =
      transactions;

    const [data] = await db
      .select({
        id,
        amount,
        payee,
        notes,
        date,
        accountId,
        categoryId,
      })
      .from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .where(
        and(
          eq(transactions.id, transactionId),
          eq(accounts.userId, auth.userId)
        )
      );
    if (!data) return c.json({ error: "Not found" }, 404);

    return c.json({ data });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      transactionsInsertSchema.omit({
        id: true,
      })
    ),
    async (c) => {
      const values = c.req.valid("json");
      const auth = getAuth(c);

      const generateError = ({ dataKey }: { dataKey: string }) => {
        return c.json({ error: `${dataKey} is required` }, 400);
      };

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
      if (!values.amount) generateError({ dataKey: "Amount" });
      if (!values.notes) generateError({ dataKey: "Note" });
      if (!values.payee) generateError({ dataKey: "Payee" });
      if (!values.date) generateError({ dataKey: "Date" });
      if (!values.accountId) generateError({ dataKey: "AccountId" });
      if (!values.categoryId) generateError({ dataKey: "CategoryId" });

      const [data] = await db
        .insert(transactions)
        .values({
          id: createId(),
          ...values,
        })
        .returning({ id: transactions.id });

      return c.json({ data });
    }
  )
  .post(
    "/bulk-create",
    clerkMiddleware(),
    zValidator(
      "json",
      z.array(
        transactionsInsertSchema.omit({
          id: true,
        })
      )
    ),
    async (c) => {
      const values = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .insert(transactions)
        .values(
          values.map((value) => ({
            id: createId(),
            ...value,
          }))
        )
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const { ids } = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
      if (!ids) return c.json({ error: "TransactionIds missing" }, 400);

      const transactionsToDelete = db.$with("transactions_to_delete").as(
        db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(
            and(inArray(transactions.id, ids), eq(accounts.userId, auth.userId))
          )
      );

      const data = await db
        .with(transactionsToDelete)
        .delete(transactions)
        .where(
          inArray(
            transactions.id,
            sql`(select id from ${transactionsToDelete})`
          )
        )
        .returning({
          id: transactions.id,
        });

      return c.json({ data });
    }
  )
  .patch(
    "/:transactionId",
    clerkMiddleware(),
    zValidator("json", transactionsInsertSchema.omit({ id: true })),
    async (c) => {
      const { transactionId } = c.req.param();
      const { amount, payee, notes, date, accountId, categoryId } =
        c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
      if (!transactionId)
        return c.json({ error: "TransactionId is required" }, 400);

      const transactionsToUpdate = db.$with("transactions_to_update").as(
        db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(
            and(
              eq(transactions.id, transactionId),
              eq(accounts.userId, auth.userId)
            )
          )
      );

      const [data] = await db
        .with(transactionsToUpdate)
        .update(transactions)
        .set({ amount, payee, notes, date, accountId, categoryId })
        .where(
          inArray(
            transactions.id,
            sql`(select id from ${transactionsToUpdate})`
          )
        )
        .returning({
          id: transactions.id,
        });

      if (!data) return c.json({ error: "Not found " }, 404);

      return c.json({ data });
    }
  )
  .delete("/:transactionId", clerkMiddleware(), async (c) => {
    const { transactionId } = c.req.param();
    const auth = getAuth(c);

    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    if (!transactionId)
      return c.json({ error: "TransactionId is required" }, 400);

    const transactionsToDelete = db.$with("transactions_to_delete").as(
      db
        .select({ id: transactions.id })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .where(
          and(
            eq(transactions.id, transactionId),
            eq(accounts.userId, auth.userId)
          )
        )
    );

    const data = await db
      .with(transactionsToDelete)
      .delete(transactions)
      .where(
        inArray(transactions.id, sql`(select id from ${transactionsToDelete})`)
      )
      .returning({
        id: transactions.id,
      });

    return c.json({ data });
  });

export default app;
