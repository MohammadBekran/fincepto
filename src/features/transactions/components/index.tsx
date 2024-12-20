"use client";

import { useState } from "react";
import { Loader2, PlusIcon } from "lucide-react";

import EditAccountModal from "@/features/accounts/components/edit-account-modal";
import EditCategoryModal from "@/features/categories/components/edit-category-modal";
import CreateTransactionModal from "@/features/transactions/components/create-transaction-modal";
import EditTransactionModal from "@/features/transactions/components/edit-transaction-modal";
import { TRANSACTION_COLUMNS } from "@/features/transactions/core/constants";
import { useCreateTransactionModal } from "@/features/transactions/core/hooks";
import {
  useBulkCreateTransactions,
  useBulkDeleteTransactions,
} from "@/features/transactions/core/services/api/mutations.api";
import { useGetTransactions } from "@/features/transactions/core/services/api/queries.api";
import { ETransactionVariants } from "@/features/transactions/core/enum";
import type { TTransactionRow } from "@/features/transactions/core/types";
import UploadTransactionsButton from "@/features/transactions/components/upload-transactions-button";
import ImportCard from "@/features/transactions/components/import-card";
import { INITIAL_TRANSACTIONS_IMPORT_RESULTS } from "@/features/transactions/core/constants";
import { useSelectAccount } from "@/features/accounts/core/hooks";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { transactions as transactionsSchema } from "@/db/schema";
import { toast } from "@/lib/utils";

const Transactions = () => {
  const [variant, setVariant] = useState<ETransactionVariants>(
    ETransactionVariants.LIST
  );
  const [importResults, setImportResults] = useState(
    INITIAL_TRANSACTIONS_IMPORT_RESULTS
  );
  const { data: transactions, isLoading: isTransactionsLoading } =
    useGetTransactions();
  const {
    mutate: bulkCreateTransactions,
    isPending: isBulkCreateTransactionPending,
  } = useBulkCreateTransactions();
  const {
    mutate: bulkDeleteTransactions,
    isPending: isBulkDeleteTransactionsPending,
  } = useBulkDeleteTransactions();
  const { open } = useCreateTransactionModal();
  const [SelectAccountDialog, confirm] = useSelectAccount();

  const isDisabled =
    isTransactionsLoading ||
    isBulkDeleteTransactionsPending ||
    isBulkCreateTransactionPending;

  const containerClassName = "w-full max-w-screen-2xl mx-auto pb-10 -mt-24";
  const cardClassName = "border-bone drop-shadow-sm";

  const handleUploadTransactions = (
    results: typeof INITIAL_TRANSACTIONS_IMPORT_RESULTS
  ) => {
    setImportResults(results);
    setVariant(ETransactionVariants.IMPORT);
  };

  const handleCancelImportTransactions = () => {
    setImportResults(INITIAL_TRANSACTIONS_IMPORT_RESULTS);
    setVariant(ETransactionVariants.LIST);
  };

  const handleSubmitImportTransactions = async (
    values: (typeof transactionsSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue.");
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    bulkCreateTransactions(
      { json: data },
      {
        onSuccess: () => handleCancelImportTransactions(),
      }
    );
  };

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

  if (variant === ETransactionVariants.IMPORT) {
    return (
      <>
        <SelectAccountDialog />
        <ImportCard
          data={importResults.data}
          disabled={isDisabled}
          onCancel={handleCancelImportTransactions}
          onSubmit={handleSubmitImportTransactions}
        />
      </>
    );
  }

  const handleDelete = (row: TTransactionRow) => {
    const ids = row.map((transactionRow) => transactionRow.original.id);

    bulkDeleteTransactions({ json: { ids } });
  };

  return (
    <div className={containerClassName}>
      <Card className={cardClassName}>
        <CardHeader className="gap-2 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            <Button
              size="sm"
              onClick={open}
              disabled={isDisabled}
              className="w-full lg:w-auto"
            >
              <PlusIcon className="size-4" />
              Add new
            </Button>
            <UploadTransactionsButton onUpload={handleUploadTransactions} />
          </div>
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
