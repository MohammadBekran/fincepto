import Tooltip from "@/components/tooltip";
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
    <Tooltip
      triggerContent={
        <span
          className="max-w-[200px] flex items-center cursor-pointer truncate hover:underline"
          onClick={handleClick}
        >
          {account}
        </span>
      }
    >
      <span className="flex items-center">{account}</span>
    </Tooltip>
  );
};

export default AccountColumn;
