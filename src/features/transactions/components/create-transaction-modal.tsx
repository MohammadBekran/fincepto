import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import TransactionForm from "@/features/transactions/components/transaction-form";
import { useCreateTransactionModal } from "@/features/transactions/core/hooks";
import { useCreateTransaction } from "@/features/transactions/core/services/api/mutations.api";
import { useCreateCategory } from "@/features/categories/core/services/api/mutations.api";
import { useGetCategories } from "@/features/categories/core/services/api/queries.api";
import { useGetAccounts } from "@/features/accounts/core/services/api/queries.api";
import { useCreateAccount } from "@/features/accounts/core/services/api/mutations.api";
import type { TTransactionFormData } from "@/features/transactions/core/types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const CreateCategory = () => {
  const { isOpen, close } = useCreateTransactionModal();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories();
  const { data: accounts, isLoading: isAccountsLoading } = useGetAccounts();
  const { mutate: createTransaction, isPending: isCreateTransitionPending } =
    useCreateTransaction();
  const { mutate: createCategory, isPending: isCreateCategoryPending } =
    useCreateCategory();
  const { mutate: createAccount, isPending: isCreateAccountPending } =
    useCreateAccount();

  const isLoading = isCategoriesLoading || isAccountsLoading;

  const isDisabled =
    isCreateTransitionPending ||
    isCreateCategoryPending ||
    isCreateAccountPending;

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

  const handleSubmit = (values: TTransactionFormData) => {
    createTransaction(
      { json: { ...values } },
      {
        onSuccess: () => close(),
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={close} modal>
      <SheetContent>
        <VisuallyHidden>
          <SheetTitle />
        </VisuallyHidden>
        <div className="space-y-4">
          <SheetHeader>
            <SheetTitle>New Transaction</SheetTitle>
            <SheetDescription>Create a new transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute flex justify-center items-center inset-0">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <TransactionForm
              disabled={isDisabled}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
              onCreateCategory={handleCreateCategory}
              onCreateAccount={handleCreateAccount}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCategory;
