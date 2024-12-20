"use client";

import { Row } from "@tanstack/react-table";
import { Loader2, PlusIcon } from "lucide-react";

import CreateAccountModal from "@/features/accounts/components/create-account-modal";
import EditAccountModal from "@/features/accounts/components/edit-account-modal";
import { ACCOUNT_COLUMNS } from "@/features/accounts/core/constants";
import { useCreateAccountModal } from "@/features/accounts/core/hooks";
import { useBulkDeleteAccount } from "@/features/accounts/core/services/api/mutations.api";
import { useGetAccounts } from "@/features/accounts/core/services/api/queries.api";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Accounts = () => {
  const { data: accounts, isLoading: isAccountsLoading } = useGetAccounts();
  const { mutate: bulkDeleteAccounts, isPending: isBulkDeleteAccountsPending } =
    useBulkDeleteAccount();
  const { open } = useCreateAccountModal();

  const isDisabled = isAccountsLoading || isBulkDeleteAccountsPending;

  const containerClassName = "w-full max-w-screen-2xl mx-auto pb-10 -mt-24";
  const cardClassName = "border-bone drop-shadow-sm";

  if (isAccountsLoading) {
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

  const handleDelete = (
    row: Row<{
      id: string;
      name: string;
    }>[]
  ) => {
    const ids = row.map((accountRow) => accountRow.original.id);

    bulkDeleteAccounts({ json: { ids } });
  };

  return (
    <div className={containerClassName}>
      <Card className={cardClassName}>
        <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle>Accounts page</CardTitle>
          <Button size="sm" onClick={open} disabled={isDisabled}>
            <PlusIcon className="size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            columns={ACCOUNT_COLUMNS}
            data={accounts ?? []}
            disabled={isDisabled}
            onDelete={(row) => handleDelete(row)}
          />
        </CardContent>
      </Card>
      <CreateAccountModal />
      <EditAccountModal />
    </div>
  );
};

export default Accounts;
