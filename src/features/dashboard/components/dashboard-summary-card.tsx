import { cva, VariantProps } from "class-variance-authority";
import type { IconType } from "react-icons";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import CountUp from "@/components/count-up";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

const boxVariant = cva("shrink-0 rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariants = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TBoxVariants = VariantProps<typeof boxVariant>;
type TIconVariants = VariantProps<typeof iconVariants>;

interface IDashboardSummaryCardProps extends TBoxVariants, TIconVariants {
  icon: IconType;
  title: string;
  dateRange: string;
  value?: number;
  percentageChange?: number;
}

const DashboardSummaryCard = ({
  icon: Icon,
  title,
  dateRange,
  value = 0,
  percentageChange = 0,
  variant,
}: IDashboardSummaryCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription>{dateRange}</CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariants({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl font-bold line-clamp-1 break-all mb-2">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p
          className={cn("text-sm line-clamp-1 text-muted-foreground", {
            "text-emerald-500": percentageChange > 0,
            "text-rose-500": percentageChange < 0,
          })}
        >
          {formatPercentage({
            value: percentageChange,
            options: { addPrefix: true },
          })}{" "}
          from last period
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardSummaryCard;
