import { clsx, type ClassValue } from "clsx";
import { eachDayOfInterval, isSameDay, subDays, format } from "date-fns";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export const convertAmountToMiliunits = ({ amount }: { amount: number }) => {
  return Math.round(amount * 1000);
};

export const calculatePercentageChange = ({
  current,
  previous,
}: {
  current: number;
  previous: number;
}) => {
  if (previous === 0) return previous === current ? 0 : 100;

  return ((current - previous) / previous) * 100;
};

export const fillMissingDays = ({
  activeDays,
  startDate,
  endDate,
}: {
  activeDays: { date: Date; income: number; expenses: number }[];
  startDate: Date;
  endDate: Date;
}) => {
  if (activeDays.length === 0) return [];

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const transactionByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) return found;
    else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  return transactionByDay;
};

export const formatPercentage = ({
  value,
  options,
}: {
  value: number;
  options?: { addPrefix: boolean };
}) => {
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value);

  if (options?.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
};

type TPeriod = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export const formatDateRange = ({ period }: { period: TPeriod }) => {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(
      defaultTo,
      "LLL dd, y"
    )}`;
  }

  if (!period.to) {
    return `${format(defaultFrom, "LLL dd")} - ${format(
      defaultTo,
      "LLL dd, y"
    )}`;
  }
};

export { toast };
