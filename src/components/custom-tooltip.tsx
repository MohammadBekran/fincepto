import { format } from "date-fns";

import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface ICustomTooltipProps {
  active?: boolean;
  payload?: { payload: { date: Date }; value: number }[];
}

const CustomTooltip = ({ active, payload = [] }: ICustomTooltipProps) => {
  if (!active) return;

  const date = payload?.[0]?.payload?.date ?? new Date();
  const income = payload?.[0]?.value ?? 0;
  const expenses = payload?.[1]?.value ?? 0;

  return (
    <div className="overflow-hidden rounded-sm shadow-sm border bg-white">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(date, "MMM dd, yyyy")}
      </div>
      <Separator />
      <div className="space-y-1 p-2 px-3">
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 rounded-full bg-blue-500" />
            <p className="text-sm text-muted-foreground">Income</p>
          </div>
          <p className="text-sm font-medium text-right">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <p className="text-sm text-muted-foreground">Income</p>
          </div>
          <p className="text-sm font-medium text-right">
            {formatCurrency(expenses * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;
