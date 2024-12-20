import CurrencyInput from "react-currency-input-field";
import { Info, MinusIcon, PlusIcon } from "lucide-react";

import Tooltip from "@/components/tooltip";
import { cn } from "@/lib/utils";

interface IAmountInputProps {
  value: string;
  placeholder: string;
  disabled: boolean;
  onChange: (value: string | undefined) => void;
}

const AmountInput = ({
  value,
  placeholder,
  disabled,
  onChange,
}: IAmountInputProps) => {
  const floatValue = parseFloat(value);
  const isIncome = floatValue > 0;
  const isExpense = floatValue < 0;

  const iconClassName = "size-3 text-white";

  const onReverseValue = () => {
    if (!value) return;

    const newValue = parseFloat(value) * -1;

    onChange(String(newValue));
  };

  return (
    <div className="relative">
      <Tooltip
        triggerContent={
          <button
            type="button"
            className={cn(
              "absolute top-1.5 left-1.5 flex justify-center items-center rounded-md transition p-2 bg-slate-400 hover:bg-slate-500",
              {
                "bg-emerald-500 hover:bg-emerald-500": isIncome,
                "bg-rose-500 hover:bg-rose-500": isExpense,
              }
            )}
            onClick={onReverseValue}
          >
            {!floatValue && <Info className={iconClassName} />}
            {isIncome && <PlusIcon className={iconClassName} />}
            {isExpense && <MinusIcon className={iconClassName} />}
          </button>
        }
      >
        Use [+] for income and use [-] for expenses
      </Tooltip>
      <CurrencyInput
        prefix="$"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full h-10 flex rounded-md border border-input rind-offset-background text-sm py-2 px-3 pl-10 bg-background placeholder:text-muted-foreground file:border-0 file:text-sm file:font-medium focus-visible:outline-none file:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
      />
      <p className="text-xs mt-2 text-muted-foreground">
        {isIncome && "This will count as an income"}
        {isExpense && "This will count as an expense"}
      </p>
    </div>
  );
};

export default AmountInput;
