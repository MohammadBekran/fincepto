import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useEditAccountModal } from "@/features/accounts/core/hooks";
import { useDeleteAccount } from "@/features/accounts/core/services/api/mutations.api";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/core/hooks";

const AccountColumnActions = ({ accountId }: { accountId: string }) => {
  const { mutate: deleteAccount, isPending: isDeleteAccountPending } =
    useDeleteAccount();
  const { open } = useEditAccountModal();
  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this account.",
    variant: "ghost",
  });

  const handleDeleteAccount = async () => {
    const ok = await confirm();

    if (ok) {
      deleteAccount({ param: { accountId } });
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
            disabled={isDeleteAccountPending}
            onClick={() => open({ accountId })}
          >
            <Edit className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDeleteAccountPending}
            onClick={handleDeleteAccount}
          >
            <Trash className="size-4" />
            Delete
          </DropdownMenuItem>{" "}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AccountColumnActions;
