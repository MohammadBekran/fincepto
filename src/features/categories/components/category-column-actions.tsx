import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useEditCategoryModal } from "@/features/categories/core/hooks";
import { useDeleteCategory } from "@/features/categories/core/services/api/mutations.api";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/core/hooks";

const CategoryColumnActions = ({ categoryId }: { categoryId: string }) => {
  const { mutate: deleteCategory, isPending: isDeleteCategoryPending } =
    useDeleteCategory();
  const { open } = useEditCategoryModal();
  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this category.",
    variant: "ghost",
  });

  const handleDeleteCategory = async () => {
    const ok = await confirm();

    if (ok) {
      deleteCategory({ param: { categoryId } });
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={isDeleteCategoryPending}
            onClick={() => open({ categoryId })}
          >
            <Edit className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDeleteCategoryPending}
            onClick={handleDeleteCategory}
          >
            <Trash className="size-4" />
            Delete
          </DropdownMenuItem>{" "}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CategoryColumnActions;
