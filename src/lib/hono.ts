import { clerkMiddleware } from "@hono/clerk-auth";
import { hc } from "hono/client";

import type { TApp } from "@/app/api/[[...route]]/route";

export const client = hc<TApp>(process.env.NEXT_PUBLIC_APP_URL!);

export const clerkAuthMiddleware = clerkMiddleware({
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});
