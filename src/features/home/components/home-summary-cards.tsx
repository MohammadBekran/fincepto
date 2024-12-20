"use client";

import { FaPiggyBank, FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import { useGetSummary } from "@/features/summary/core/services/api/queries.api";

import HomeSummaryCard from "@/features/home/components/home-summary-card";
import HomeSummaryCardLoading from "@/features/home/components/home-summary-card-loading";

import { useFilters } from "@/core/hooks";
import { formatDateRange } from "@/lib/utils";

const HomeSummaryCards = () => {
  const [filters] = useFilters();
  const { data: summary, isLoading: isLoading } = useGetSummary();

  const wrapperClassName = "grid grid-cols-1 gap-8 mb-8 lg:grid-cols-3";

  const dateRangeLabel =
    formatDateRange({
      period: { from: filters.from || "", to: filters.from || "" },
    }) || "";

  if (isLoading)
    return (
      <div className={wrapperClassName}>
        <HomeSummaryCardLoading />
        <HomeSummaryCardLoading />
        <HomeSummaryCardLoading />
      </div>
    );

  return (
    <div className={wrapperClassName}>
      <HomeSummaryCard
        title="Remaining"
        value={summary?.remainingChange}
        icon={FaPiggyBank}
        dateRange={dateRangeLabel}
      />
      <HomeSummaryCard
        title="Income"
        value={summary?.incomeAmount}
        percentageChange={summary?.incomeChange}
        icon={FaArrowTrendUp}
        variant="success"
        dateRange={dateRangeLabel}
      />
      <HomeSummaryCard
        title="Expenses"
        value={summary?.expensesAmount}
        percentageChange={summary?.expensesChange}
        icon={FaArrowTrendDown}
        variant="danger"
        dateRange={dateRangeLabel}
      />
    </div>
  );
};

export default HomeSummaryCards;
