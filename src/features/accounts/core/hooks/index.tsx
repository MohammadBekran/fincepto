import { useState, useRef, JSX } from "react";
import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";

import { useGetAccounts } from "../services/api/queries.api";
import { useCreateAccount } from "../services/api/mutations.api";

import Select from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const useCreateAccountModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-account",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};

export const useEditAccountModal = () => {
  const [accountId, setAccountId] = useQueryState(
    "edit-account",
    parseAsString
  );

  const open = ({ accountId }: { accountId: string }) => {
    setAccountId(accountId);
  };
  const close = () => setAccountId(null);

  return {
    accountId,
    open,
    close,
    setAccountId,
  };
};

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);
  const selectValue = useRef<string>("");
  const { data: accounts, isLoading: isAccountsLoading } = useGetAccounts();
  const { mutate: createAccount, isPending: isCreateAccountPending } =
    useCreateAccount();

  const accountOptions = accounts?.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const isDisabled = isAccountsLoading || isCreateAccountPending;

  const handleCreateAccount = (name: string) =>
    createAccount({ json: { name } });

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => setPromise(null);

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);

    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);

    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <Dialog open={promise !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Account</DialogTitle>
            <DialogDescription>
              Select an account to continue.
            </DialogDescription>
          </DialogHeader>
          <Select
            options={accountOptions}
            placeholder="Select an account"
            onCreate={handleCreateAccount}
            onChange={(value) => (selectValue.current = value as string)}
            disabled={isDisabled}
          />
          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return [ConfirmationDialog, confirm];
};
