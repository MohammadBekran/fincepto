"use client";

import { Loader2, PlusIcon } from "lucide-react";

import EditAccountModal from "@/features/accounts/components/edit-account-modal";
import EditCategoryModal from "@/features/categories/components/edit-category-modal";
import CreateTransactionModal from "@/features/transactions/components/create-transaction-modal";
import EditTransactionModal from "@/features/transactions/components/edit-transaction-modal";
import { TRANSACTION_COLUMNS } from "@/features/transactions/core/constants";
import { useCreateTransactionModal } from "@/features/transactions/core/hooks";
import { useBulkDeleteTransactions } from "@/features/transactions/core/services/api/mutations.api";
import { useGetTransactions } from "@/features/transactions/core/services/api/queries.api";
import type { TTransactionRow } from "@/features/transactions/core/types";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Transactions = () => {
  const { data: transactions, isLoading: isTransactionsLoading } =
    useGetTransactions();
  const {
    mutate: bulkDeleteTransactions,
    isPending: isBulkDeleteTransactionsPending,
  } = useBulkDeleteTransactions();
  const { open } = useCreateTransactionModal();

  const isDisabled = isTransactionsLoading || isBulkDeleteTransactionsPending;

  const containerClassName = "w-full max-w-screen-2xl mx-auto pb-10 -mt-24";
  const cardClassName = "border-bone drop-shadow-sm";

  if (isTransactionsLoading) {
    return (
      <div className={containerClassName}>
        <Card className={cardClassName}>
          <CardHeader>
            <Skeleton className="w-48 h-8" />
          </CardHeader>
          <CardContent>
            <div className="w-full h-[500px] flex justify-center items-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = (row: TTransactionRow) => {
    const ids = row.map((transactionRow) => transactionRow.original.id);

    bulkDeleteTransactions({ json: { ids } });
  };

  return (
    <div className={containerClassName}>
      <Card className={cardClassName}>
        <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle>Transaction History</CardTitle>
          <Button size="sm" onClick={open} disabled={isDisabled}>
            <PlusIcon className="size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="payee"
            columns={TRANSACTION_COLUMNS}
            data={transactions ?? []}
            disabled={isDisabled}
            onDelete={(row) => handleDelete(row)}
          />
        </CardContent>
      </Card>
      <CreateTransactionModal />
      <EditTransactionModal />
      <EditAccountModal />
      <EditCategoryModal />
    </div>
  );
};

export default Transactions;
