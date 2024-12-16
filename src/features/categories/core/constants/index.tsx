import { client } from "@/lib/hono";
import { ColumnDef } from "@tanstack/react-table";
import { InferResponseType } from "hono";
import { ArrowUpDown } from "lucide-react";

import CategoryColumnActions from "@/features/categories/components/category-column-actions";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type TCategoryResponse = InferResponseType<
  typeof client.api.categories.$get
>["data"][1];

export const CATEGORY_COLUMNS: ColumnDef<TCategoryResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoryColumnActions categoryId={row.original.id} />,
  },
];
