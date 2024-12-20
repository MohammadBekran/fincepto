"use client";

import {
  Area,
  AreaChart as RechartsArea,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { format } from "date-fns";

import CustomTooltip from "@/components/custom-tooltip";

const AreaChart = ({
  data,
}: {
  data: { date: string; income: number; expenses: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsArea data={data}>
        <CartesianGrid />
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3d822f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3d822f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#f43f5e" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => format(value, "dd MMM")}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          dataKey="income"
          type="monotone"
          fill="url(#income)"
          stroke="#3d82f6"
          strokeWidth={2}
          stackId="income"
          className="drop-shadow-sm"
        />
        <Area
          dataKey="expenses"
          type="monotone"
          fill="url(#expenses)"
          stroke="#f43f5e"
          strokeWidth={2}
          stackId="expenses"
          className="drop-shadow-sm"
        />
      </RechartsArea>
    </ResponsiveContainer>
  );
};

export default AreaChart;
