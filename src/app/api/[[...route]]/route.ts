import { Hono } from "hono";
import { handle } from "hono/vercel";

import accounts from "@/features/accounts/core/server/route";
import categories from "@/features/categories/core/server/route";
import transactions from "@/features/transactions/core/server/route";
import summary from "@/features/summary/core/server/route";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/summary", summary);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type TApp = typeof routes;
