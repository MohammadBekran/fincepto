/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "@/lib/utils";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9254"];

const RadialGradientChart = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  const formattedData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        cx="50%"
        cy="30%"
        barSize={10}
        innerRadius="90%"
        outerRadius="40%"
        data={formattedData}
      >
        <RadialBar
          dataKey="value"
          background
          label={{
            position: "insideStart",
            fill: "#fff",
            fontSize: "12px",
          }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => (
            <ul className="flex flex-col space-y-2">
              {payload.map((entry: any, index: number) => (
                <li
                  key={`radial-gradient-chart-item-${index}`}
                  className="flex items-center space-x-2"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <div className="space-x-1">
                    <span className="text-sm text-muted-foreground">
                      {entry.value}
                    </span>
                    <span className="text-sm">
                      {formatCurrency(entry.payload.value)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default RadialGradientChart;
