"use client";

import {
  AreaChartIcon,
  BarChart3Icon,
  FileSearchIcon,
  LineChartIcon,
} from "lucide-react";
import { useState } from "react";

import AreaChart from "@/components/area-chart";
import LineChart from "@/components/line-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BarChart from "@/components/bar-chart";

const Chart = ({
  data = [],
}: {
  data?: { date: string; income: number; expenses: number }[];
}) => {
  const [chartType, setChartType] = useState("area");

  const handleChartTypeChange = (type: string) => {
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={handleChartTypeChange}>
          <SelectTrigger className="h-9 rounded-md px-3 lg:w-auto">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChartIcon className="size-4 shrink-0 mr-2" />
                <p>Area chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChartIcon className="size-4 shrink-0 mr-2" />
                <p>Line chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart3Icon className="size-4 shrink-0 mr-2" />
                <p>Bar chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="w-full h-[350px] flex flex-col justify-center items-center gap-y-4">
            <FileSearchIcon className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === "area" && <AreaChart data={data} />}
            {chartType === "line" && <LineChart data={data} />}
            {chartType === "bar" && <BarChart data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
