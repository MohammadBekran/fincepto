import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import AccountForm from "@/features/categories/components/category-form";
import { useCreateCategoryModal } from "@/features/categories/core/hooks";
import { useCreateCategory } from "@/features/categories/core/services/api/mutations.api";
import type { TCategoryFormData } from "@/features/categories/core/types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const CreateCategory = () => {
  const { mutate: createAccount, isPending: isCreateCategoryPending } =
    useCreateCategory();
  const { isOpen, close } = useCreateCategoryModal();

  const handleSubmit = (values: TCategoryFormData) => {
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
            <SheetTitle>New Category</SheetTitle>
            <SheetDescription>
              Create a new category to organize your transactions
            </SheetDescription>
          </SheetHeader>
          <AccountForm
            disabled={isCreateCategoryPending}
            onSubmit={handleSubmit}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCategory;
