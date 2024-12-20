import { useDeleteConnectedBank } from "@/features/plaid/core/services/api/mutations.api";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/core/hooks";

const PlaidDisconnect = () => {
  const {
    mutate: deleteConnectedBank,
    isPending: isDeleteConnectedBankPending,
  } = useDeleteConnectedBank();
  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message:
      "This will disconnect your bank account, and remove all associated data.",
    variant: "ghost",
  });

  const handleDeleteConnectedBank = async () => {
    const ok = await confirm();

    if (ok) deleteConnectedBank();
  };

  return (
    <>
      <ConfirmationDialog />
      <Button
        size="sm"
        variant="ghost"
        disabled={isDeleteConnectedBankPending}
        onClick={handleDeleteConnectedBank}
      >
        Disconnect
      </Button>
    </>
  );
};

export default PlaidDisconnect;
