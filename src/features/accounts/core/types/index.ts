import { z } from "zod";

import { accountsInsertSchema } from "@/db/schema";

export type TAccountFormData = z.infer<typeof accountsInsertSchema>;
