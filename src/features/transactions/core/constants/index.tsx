import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

import AccountColumn from "@/features/transactions/components/account-column";
import CategoryColumn from "@/features/transactions/components/category-column";
import TransactionColumnActions from "@/features/transactions/components/transaction-column-actions";
import type { TTransactionResponse } from "@/features/transactions/core/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import Tooltip from "@/components/tooltip";

export const TRANSACTION_COLUMNS: ColumnDef<TTransactionResponse>[] = [
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
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;

      const formattedDate = format(date, "dd MMMM, yyyy");

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "payee",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Payee
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Tooltip triggerContent={<span>{row.original.payee}</span>}>
        <span className="truncate">{row.original.payee}</span>
      </Tooltip>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as string;

      const floatAmount = parseFloat(amount);
      const formattedAmount = formatCurrency(floatAmount);

      const amountBadgeVariant = floatAmount < 0 ? "destructive" : "primary";

      return (
        <Badge
          variant={amountBadgeVariant}
          className="text-xs font-medium py-2.5 px-3.5"
        >
          {formattedAmount}
        </Badge>
      );
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Account
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <AccountColumn
        account={row.original.account}
        accountId={row.original.accountId}
      />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { id, categoryId, category } = row.original;

      return (
        <CategoryColumn id={id} category={category} categoryId={categoryId} />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <TransactionColumnActions transactionId={row.original.id} />
    ),
  },
];

export const INITIAL_TRANSACTIONS_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: [],
};
