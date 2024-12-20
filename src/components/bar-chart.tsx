"use client";

import {
  Bar,
  BarChart as RechartsBar,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import CustomTooltip from "@/components/custom-tooltip";

const BarChart = ({
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
      <RechartsBar data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickMargin={16}
          style={{ fontSize: "12px" }}
          tickFormatter={(value) => format(value, "dd MMM")}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income" fill="#3b82f6" className="drop-shadow-sm" />
        <Bar dataKey="expenses" fill="#f43f5e" className="drop-shadow-sm" />
      </RechartsBar>
    </ResponsiveContainer>
  );
};

export default BarChart;
