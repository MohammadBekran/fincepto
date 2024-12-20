import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import AccountForm from "@/features/accounts/components/account-form";
import { useCreateAccountModal } from "@/features/accounts/core/hooks";
import { useCreateAccount } from "@/features/accounts/core/services/api/mutations.api";
import type { TAccountFormData } from "@/features/accounts/core/types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const CreateAccountModal = () => {
  const { mutate: createAccount, isPending: isCreateAccountPending } =
    useCreateAccount();
  const { isOpen, close } = useCreateAccountModal();

  const handleSubmit = (values: TAccountFormData) => {
    createAccount(
      { json: values },
      {
        onSuccess: () => close(),
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <VisuallyHidden>
          <SheetTitle />
        </VisuallyHidden>
        <div className="space-y-4">
          <SheetHeader>
            <SheetTitle>New Account</SheetTitle>
            <SheetDescription>
              Create a new account to track your transactions
            </SheetDescription>
          </SheetHeader>
          <AccountForm
            disabled={isCreateAccountPending}
            onSubmit={handleSubmit}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateAccountModal;
