import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Loader2 } from "lucide-react";

import { useCreateAccount } from "@/features/accounts/core/services/api/mutations.api";
import { useGetAccounts } from "@/features/accounts/core/services/api/queries.api";
import { useCreateCategory } from "@/features/categories/core/services/api/mutations.api";
import { useGetCategories } from "@/features/categories/core/services/api/queries.api";
import TransactionForm from "@/features/transactions/components/transaction-form";
import { useEditTransactionModal } from "@/features/transactions/core/hooks";
import {
  useDeleteTransaction,
  useEditTransaction,
} from "@/features/transactions/core/services/api/mutations.api";
import { useGetTransaction } from "@/features/transactions/core/services/api/queries.api";
import type { TTransactionFormData } from "@/features/transactions/core/types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/core/hooks";

const EditTransactionModal = () => {
  const { transactionId, close } = useEditTransactionModal();
  const { data: transaction, isLoading: isTransactionLoading } =
    useGetTransaction({
      transactionId: transactionId ?? "",
    });
  const { mutate: editTransaction, isPending: isEditTransactionPending } =
    useEditTransaction();
  const { mutate: deleteTransaction, isPending: isDeleteTransactionPending } =
    useDeleteTransaction();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories();
  const { data: accounts, isLoading: isAccountsLoading } = useGetAccounts();
  const { mutate: createCategory, isPending: isCreateCategoryPending } =
    useCreateCategory();
  const { mutate: createAccount, isPending: isCreateAccountPending } =
    useCreateAccount();
  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this transaction.",
    variant: "ghost",
  });

  const isLoading =
    isTransactionLoading || isCategoriesLoading || isAccountsLoading;

  const isDisabled =
    isEditTransactionPending ||
    isCreateCategoryPending ||
    isCreateAccountPending ||
    isDeleteTransactionPending;

  const categoryOptions = (categories ?? []).map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const accountOptions = (accounts ?? []).map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const handleCreateCategory = (name: string) => {
    createCategory({ json: { name } });
  };

  const handleCreateAccount = (name: string) => {
    createAccount({
      json: { name },
    });
  };

  if (!transaction || isLoading) return null;

  const finalTransaction = {
    ...transaction,
    date: transaction?.date as unknown as Date,
  } as TTransactionFormData;

  const handleSubmit = (values: TTransactionFormData) => {
    editTransaction(
      { param: { transactionId: transaction?.id ?? "" }, json: { ...values } },
      {
        onSuccess: () => close(),
      }
    );
  };

  const handleDeleteTransaction = async () => {
    const ok = await confirm();

    if (ok) {
      deleteTransaction(
        { param: { transactionId: transactionId ?? "" } },
        {
          onSuccess: () => close(),
        }
      );
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={!!transactionId} onOpenChange={close}>
        <SheetContent>
          <VisuallyHidden>
            <SheetTitle />
          </VisuallyHidden>
          <div className="space-y-4">
            <SheetHeader>
              <SheetTitle>Edit Transaction</SheetTitle>
              <SheetDescription>Edit an existing transaction</SheetDescription>
              {isLoading ? (
                <div className="absolute flex justify-center items-center inset-0">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <TransactionForm
                  initialValues={finalTransaction}
                  disabled={isDisabled}
                  categoryOptions={categoryOptions}
                  accountOptions={accountOptions}
                  onCreateCategory={handleCreateCategory}
                  onCreateAccount={handleCreateAccount}
                  onDelete={handleDeleteTransaction}
                  onSubmit={handleSubmit}
                />
              )}
            </SheetHeader>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTransactionModal;
