import { TriangleAlert } from "lucide-react";

import { useEditAccountModal } from "@/features/accounts/core/hooks";
import { useEditCategoryModal } from "@/features/categories/core/hooks";
import { useEditTransactionModal } from "@/features/transactions/core/hooks";

import Tooltip from "@/components/tooltip";
import { cn } from "@/lib/utils";

interface ICategoryColumnProps {
  id: string;
  category: string | null;
  categoryId: string | null;
}

const CategoryColumn = ({ id, category, categoryId }: ICategoryColumnProps) => {
  const { open: openEditCategoryModal } = useEditCategoryModal();
  const { open: openCreateTransactionModal, close: closeEditTransactionModal } =
    useEditTransactionModal();
  const { close: closeEditAccountModal } = useEditAccountModal();

  const handleClick = () => {
    closeEditTransactionModal();
    closeEditAccountModal();

    if (categoryId) openEditCategoryModal({ categoryId });
    else openCreateTransactionModal({ transactionId: id });
  };

  return (
    <Tooltip
      triggerContent={
        <span
          className={cn(
            "max-w-[200px] flex items-center gap-x-2 cursor-pointer truncate hover:underline",
            {
              "text-rose-500": !category,
            }
          )}
          onClick={handleClick}
        >
          {!category && <TriangleAlert className="size-4 shrink-0" />}
          {category ?? "UnCategorized"}
        </span>
      }
    >
      <span className={cn("max-w-[200px] flex items-center gap-x-2")}>
        {!category && <TriangleAlert className="size-4 shrink-0" />}
        {category ?? "UnCategorized"}
      </span>
    </Tooltip>
  );
};

export default CategoryColumn;
