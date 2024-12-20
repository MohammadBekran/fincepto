import { z } from "zod";

import { categoriesInsertSchema } from "@/db/schema";

export type TCategoryFormData = z.infer<typeof categoriesInsertSchema>;
