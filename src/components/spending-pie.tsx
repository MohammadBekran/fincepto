"use client";

import {
  FileSearchIcon,
  PieChartIcon,
  RadarIcon,
  TargetIcon,
} from "lucide-react";
import { useState } from "react";

import PieChart from "@/components/pie-chart";
import RadarChart from "@/components/radar-chart";
import RadialGradientChart from "@/components/radial-gradient-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SpendingPie = ({
  data = [],
}: {
  data?: { name: string; value: number }[];
}) => {
  const [chartType, setChartType] = useState("pie");

  const handleChartTypeChange = (type: string) => {
    setChartType(type);
  };

  console.log({ data });

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
        <Select defaultValue={chartType} onValueChange={handleChartTypeChange}>
          <SelectTrigger className="h-9 rounded-md px-3 lg:w-auto">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChartIcon className="size-4 shrink-0 mr-2" />
                <p>Pie chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center">
                <RadarIcon className="size-4 shrink-0 mr-2" />
                <p>Radar chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center">
                <TargetIcon className="size-4 shrink-0 mr-2" />
                <p>Radial chart</p>
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
            {chartType === "pie" && <PieChart data={data} />}
            {chartType === "radar" && <RadarChart data={data} />}
            {chartType === "radial" && <RadialGradientChart data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingPie;
