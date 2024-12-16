import { Hono } from "hono";
import { handle } from "hono/vercel";

import accounts from "@/features/accounts/core/server/route";
import categories from "@/features/categories/core/server/route";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type TApp = typeof routes;
