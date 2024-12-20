"use client";

import Chart from "@/components/chart";
import ChartLoading from "@/features/home/components/chart-loading";
import { useGetSummary } from "@/features/summary/core/services/api/queries.api";

import SpendingPieLoading from "@/components/spending-pie-loading";
import SpendingPie from "@/components/spending-pie";

const HomeCharts = () => {
  const { data: summary, isLoading } = useGetSummary();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
        <div className="col-span-1 lg:grid-cols-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="col-span-1 lg:grid-cols-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={summary?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={summary?.categories} />
      </div>
    </div>
  );
};

export default HomeCharts;
