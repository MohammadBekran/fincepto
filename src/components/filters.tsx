"use client";

import AccountFilter from "@/components/account-filter";
import DateFilter from "@/components/date-filter";

const Filters = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 lg:w-auto lg:flex-row lg:gap-y-0 lg:gap-x-2">
      <AccountFilter />
      <DateFilter />
    </div>
  );
};

export default Filters;
