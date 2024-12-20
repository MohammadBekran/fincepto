import RangeDatePicker from "@/components/range-date-picker";

import { useFilters } from "@/core/hooks";

const DateFilter = () => {
  const [filters, setFilters] = useFilters();

  const date = { from: filters.from, to: filters.to };

  const handleResetDateFilter = () => {
    setFilters((prev) => ({
      ...prev,
      from: null,
      to: null,
    }));
  };

  const handleApplyDateFilter = (formattedRange: { from: Date; to: Date }) => {
    setFilters((prev) => ({
      ...prev,
      from: formattedRange.from,
      to: formattedRange.to,
    }));
  };

  return (
    <RangeDatePicker
      date={date}
      handleResetDateFilter={handleResetDateFilter}
      handleApplyDateFilter={handleApplyDateFilter}
      classNames={{
        wrapper: "w-full lg:w-auto",
        button:
          "w-full h-9 border-none outline-none bg-white/10 text-white transition hover:bg-white/10 hover:text-white focus:ring-offset-0 focus:ring-transparent focus:bg-white/30 lg:w-auto",
      }}
    />
  );
};

export default DateFilter;
