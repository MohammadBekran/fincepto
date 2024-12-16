import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";

export const useCreateCategoryModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-category",
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

export const useEditCategoryModal = () => {
  const [categoryId, setCategoryId] = useQueryState(
    "edit-category",
    parseAsString
  );

  const open = ({ categoryId }: { categoryId: string }) => {
    setCategoryId(categoryId);
  };
  const close = () => setCategoryId(null);

  return {
    categoryId,
    open,
    close,
    setCategoryId,
  };
};
