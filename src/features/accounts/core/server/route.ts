import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { accounts, accountsInsertSchema } from "@/db/schema";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const data = await db
      .select({ id: accounts.id, name: accounts.name })
      .from(accounts);

    return c.json({ data });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      accountsInsertSchema.pick({
        name: true,
      })
    ),
    async (c) => {
      const { name } = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
      if (!name) return c.json({ error: "Name is required" }, 400);

      const [data] = await db
        .insert(accounts)
        .values({ id: createId(), userId: auth.userId, name })
        .returning();

      return c.json({ data });
    }
  )
  .put(
    "/:accountId",
    clerkMiddleware(),
    zValidator("json", accountsInsertSchema.pick({ name: true })),
    async (c) => {
      const { accountId } = c.req.param();
      const { name } = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
      if (!accountId) return c.json({ error: "AccountId is required" }, 400);
      if (!name) return c.json({ error: "Name is required" }, 400);

      const [data] = await db
        .update(accounts)
        .set({ name })
        .where(
          and(eq(accounts.userId, auth.userId), eq(accounts.id, accountId))
        )
        .returning();

      if (!data) return c.json({ error: "Not found " }, 404);

      return c.json({ data });
    }
  );

export default app;
