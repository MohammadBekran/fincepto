import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface ICategoryTooltipProps {
  active?: boolean;
  payload?: { payload: { name: string }; value: number }[];
}

const CategoryTooltip = ({ active, payload = [] }: ICategoryTooltipProps) => {
  if (!active) return null;

  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className="overflow-hidden rounded-sm border shadow-sm bg-white">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <p className="text-sm text-muted-foreground">Expenses</p>
            <p className="text-sm text-right font-medium">
              {formatCurrency(value * -1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTooltip;
