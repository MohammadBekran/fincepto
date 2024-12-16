import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { useCreateAccountModal } from "@/features/accounts/core/hooks";
import AccountForm from "@/features/accounts/components/account-form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const CreateAccountModal = () => {
  const { isOpen, close } = useCreateAccountModal();

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
          <AccountForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateAccountModal;
