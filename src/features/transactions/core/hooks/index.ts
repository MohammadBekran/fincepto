import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";

export const useCreateTransactionModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-transaction",
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

export const useEditTransactionModal = () => {
  const [transactionId, setTransactionId] = useQueryState(
    "edit-transaction",
    parseAsString
  );

  const open = ({ transactionId }: { transactionId: string }) => {
    setTransactionId(transactionId);
  };
  const close = () => setTransactionId(null);

  return {
    transactionId,
    open,
    close,
    setTransactionId,
  };
};
