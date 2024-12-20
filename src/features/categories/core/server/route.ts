import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { categories, categoriesInsertSchema } from "@/db/schema";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const data = await db
      .select({ id: categories.id, name: categories.name })
      .from(categories);

    return c.json({ data });
  })
  .get("/:categoryId", clerkMiddleware(), async (c) => {
    const { categoryId } = c.req.param();
    const auth = getAuth(c);

    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    if (!categoryId) return c.json({ error: "CategoryId is required" }, 400);

    const [data] = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(
        and(eq(categories.userId, auth.userId), eq(categories.id, categoryId))
      );

    if (!data) return c.json({ error: "Not found " }, 404);

    return c.json({ data });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      categoriesInsertSchema.pick({
        name: true,
      })
    ),
    async (c) => {
      const { name } = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
      if (!name) return c.json({ error: "Name is required" }, 400);

      const [data] = await db
        .insert(categories)
        .values({ id: createId(), userId: auth.userId, name })
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
      if (!ids) return c.json({ error: "CategoryIds missing" }, 400);

      const data = await db
        .delete(categories)
        .where(
          and(eq(categories.userId, auth.userId), inArray(categories.id, ids))
        )
        .returning({
          id: categories.id,
        });

      return c.json({ data });
    }
  )
  .patch(
    "/:categoryId",
    clerkMiddleware(),
    zValidator("json", categoriesInsertSchema.pick({ name: true })),
    async (c) => {
      const { categoryId } = c.req.param();
      const { name } = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
      if (!categoryId) return c.json({ error: "CategoryId is required" }, 400);
      if (!name) return c.json({ error: "Name is required" }, 400);

      const [data] = await db
        .update(categories)
        .set({ name })
        .where(
          and(eq(categories.userId, auth.userId), eq(categories.id, categoryId))
        )
        .returning();

      if (!data) return c.json({ error: "Not found " }, 404);

      return c.json({ data });
    }
  )
  .delete("/:categoryId", clerkMiddleware(), async (c) => {
    const { categoryId } = c.req.param();
    const auth = getAuth(c);

    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
    if (!categoryId) return c.json({ error: "CategoryId is required" }, 400);

    const [data] = await db
      .delete(categories)
      .where(
        and(eq(categories.userId, auth.userId), eq(categories.id, categoryId))
      )
      .returning();

    if (!data) return c.json({ error: "Not found" }, 404);

    return c.json({ data });
  });

export default app;
