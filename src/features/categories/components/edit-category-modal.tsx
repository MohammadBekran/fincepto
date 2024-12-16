import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import CategoryForm from "@/features/categories/components/category-form";
import { useEditCategoryModal } from "@/features/categories/core/hooks";
import {
  useDeleteCategory,
  useEditCategory,
} from "@/features/categories/core/services/api/mutations.api";
import { useGetCategory } from "@/features/categories/core/services/api/queries.api";
import type { TCategoryFormData } from "@/features/categories/core/types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/core/hooks";

const EditCategoryModal = () => {
  const { categoryId, close } = useEditCategoryModal();
  const { data: category } = useGetCategory({ categoryId: categoryId ?? "" });
  const { mutate: editCategory, isPending: isEditCategoryPending } =
    useEditCategory();
  const { mutate: deleteCategory, isPending: isDeleteCategoryPending } =
    useDeleteCategory();
  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this category.",
    variant: "ghost",
  });

  const isDisabled = isEditCategoryPending || isDeleteCategoryPending;

  const handleSubmit = (values: TCategoryFormData) => {
    editCategory(
      { param: { categoryId: category?.id ?? "" }, json: values },
      {
        onSuccess: () => close(),
      }
    );
  };

  const handleDeleteCategory = async () => {
    const ok = await confirm();

    if (ok) {
      deleteCategory(
        { param: { categoryId: categoryId ?? "" } },
        {
          onSuccess: () => close(),
        }
      );
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={!!categoryId} onOpenChange={close}>
        <SheetContent>
          <VisuallyHidden>
            <SheetTitle />
          </VisuallyHidden>
          <div className="space-y-4">
            <SheetHeader>
              <SheetTitle>Edit Category</SheetTitle>
              <SheetDescription>Edit an existing category</SheetDescription>
            </SheetHeader>
            <CategoryForm
              initialValues={category}
              disabled={isDisabled}
              onSubmit={handleSubmit}
              onDelete={handleDeleteCategory}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditCategoryModal;
