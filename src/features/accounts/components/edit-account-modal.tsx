import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import AccountForm from "@/features/accounts/components/account-form";
import { useEditAccountModal } from "@/features/accounts/core/hooks";
import {
  useDeleteAccount,
  useEditAccount,
} from "@/features/accounts/core/services/api/mutations";
import { useGetAccount } from "@/features/accounts/core/services/api/queries";
import type { TAccountFormData } from "@/features/accounts/core/types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/core/hooks";

const EditAccountModal = () => {
  const { accountId, close } = useEditAccountModal();
  const { data: account } = useGetAccount({ accountId: accountId ?? "" });
  const { mutate: editAccount, isPending: isEditAccountPending } =
    useEditAccount();
  const { mutate: deleteAccount, isPending: isDeleteAccountPending } =
    useDeleteAccount();
  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this account.",
    variant: "ghost",
  });

  const isDisabled = isEditAccountPending || isDeleteAccountPending;

  const handleSubmit = (values: TAccountFormData) => {
    editAccount(
      { param: { accountId: account?.id ?? "" }, json: values },
      {
        onSuccess: () => close(),
      }
    );
  };

  const handleDeleteAccount = async () => {
    const ok = await confirm();

    if (ok) {
      deleteAccount(
        { param: { accountId: accountId ?? "" } },
        {
          onSuccess: () => close(),
        }
      );
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={!!accountId} onOpenChange={close}>
        <SheetContent>
          <VisuallyHidden>
            <SheetTitle />
          </VisuallyHidden>
          <div className="space-y-4">
            <SheetHeader>
              <SheetTitle>Edit Account</SheetTitle>
              <SheetDescription>Edit an existing account</SheetDescription>
            </SheetHeader>
            <AccountForm
              initialValues={account}
              disabled={isDisabled}
              onSubmit={handleSubmit}
              onDelete={handleDeleteAccount}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditAccountModal;
