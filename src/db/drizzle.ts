// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql }, { schema });
