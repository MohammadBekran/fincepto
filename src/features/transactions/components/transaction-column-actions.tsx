import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useEditAccountModal } from "@/features/accounts/core/hooks";
import { useEditCategoryModal } from "@/features/categories/core/hooks";
import { useEditTransactionModal } from "@/features/transactions/core/hooks";
import { useDeleteTransaction } from "@/features/transactions/core/services/api/mutations.api";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/core/hooks";

const TransactionColumnActions = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const { mutate: deleteTransaction, isPending: isDeleteTransactionPending } =
    useDeleteTransaction();
  const { open: openEditTransactionModal } = useEditTransactionModal();
  const { close: closeEditAccountModal } = useEditAccountModal();
  const { close: closeEditCategoryModal } = useEditCategoryModal();

  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this transaction.",
    variant: "ghost",
  });

  const handleOpenEditTransactionModal = () => {
    closeEditAccountModal();
    closeEditCategoryModal();

    openEditTransactionModal({ transactionId });
  };

  const handleDeleteTransaction = async () => {
    const ok = await confirm();

    if (ok) {
      deleteTransaction({ param: { transactionId } });
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
            disabled={isDeleteTransactionPending}
            onClick={handleOpenEditTransactionModal}
          >
            <Edit className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDeleteTransactionPending}
            onClick={handleDeleteTransaction}
          >
            <Trash className="size-4" />
            Delete
          </DropdownMenuItem>{" "}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TransactionColumnActions;
