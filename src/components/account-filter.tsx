import { useGetAccounts } from "@/features/accounts/core/services/api/queries.api";
import { useGetSummary } from "@/features/summary/core/services/api/queries.api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/core/hooks";

const AccountFilter = () => {
  const [filters, setFilters] = useFilters();
  const { isLoading: isSummaryLoading } = useGetSummary();
  const { data: accounts, isLoading: isAccountsLoading } = useGetAccounts();

  const isLoading = isSummaryLoading || isAccountsLoading;

  const handleAccountChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      accountId: value === "all" ? null : value,
    }));
  };

  return (
    <Select
      value={filters.accountId ?? ""}
      disabled={isLoading}
      onValueChange={handleAccountChange}
    >
      <SelectTrigger className="w-full h-9 rounded-md border-none outline-none font-normal transition px-3 bg-white/10 text-white hover:bg-white/20 hover:text-white focus:ring-offset-0 focus:ring-transparent focus:bg-white/30 lg:w-auto">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {accounts?.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountFilter;
