import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";

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
  const [open, setOpen] = useQueryState("edit-account", parseAsString);

  return {
    open,
    setOpen,
  };
};
