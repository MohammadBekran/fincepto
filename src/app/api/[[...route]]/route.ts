import { Hono } from "hono";
import { handle } from "hono/vercel";

import accounts from "@/features/accounts/core/server/route";
import categories from "@/features/categories/core/server/route";
import transactions from "@/features/transactions/core/server/route";
import summary from "@/features/summary/core/server/route";
import plaid from "@/features/plaid/core/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/plaid", plaid)
  .route("/summary", summary)
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type TApp = typeof routes;
