import { useEditAccountModal } from "@/features/accounts/core/hooks";
import { useEditCategoryModal } from "@/features/categories/core/hooks";
import { useEditTransactionModal } from "@/features/transactions/core/hooks";

interface IAccountColumnProps {
  account: string | null;
  accountId: string | null;
}

const AccountColumn = ({ account, accountId }: IAccountColumnProps) => {
  const { open: openEditAccountModal } = useEditAccountModal();
  const { close: closeEditTransactionModal } = useEditTransactionModal();
  const { close: closeEditCategoryModal } = useEditCategoryModal();

  const handleClick = () => {
    closeEditTransactionModal();
    closeEditCategoryModal();

    if (accountId) openEditAccountModal({ accountId });
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={handleClick}
    >
      {account}
    </div>
  );
};

export default AccountColumn;
