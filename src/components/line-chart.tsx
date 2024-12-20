"use client";

import { format } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import CustomTooltip from "@/components/custom-tooltip";

const LineChart = ({
  data,
}: {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsLine data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => format(value, "dd MMM")}
          tickMargin={16}
          style={{ fontSize: "12px" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dot={false}
          dataKey="income"
          stroke="#3b82f6"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
        <Line
          dot={false}
          dataKey="expenses"
          stroke="#f43f5e"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
      </RechartsLine>
    </ResponsiveContainer>
  );
};

export default LineChart;
