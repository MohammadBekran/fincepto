"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface IDatePickerProps {
  value: Date | undefined;
  placeholder?: string;
  className?: string;
  disabled: boolean;
  onChange: (date: Date) => void;
}

const DatePicker = ({
  value,
  placeholder = "Select date",
  className,
  disabled,
  onChange,
}: IDatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal px-3",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        style={{ zIndex: 99999999999, position: "relative" }}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date as Date)}
          className="!z-50"
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
