"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ParserBuilder, Values } from "nuqs";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface IRangeDatePickerProps {
  date: Values<{ from: ParserBuilder<Date>; to: ParserBuilder<Date> }>;
  classNames?: {
    wrapper?: string;
    button?: string;
  };
  handleResetDateFilter: () => void;
  handleApplyDateFilter: (formattedRange: { from: Date; to: Date }) => void;
}

const RangeDatePicker = ({
  date,
  classNames,
  handleResetDateFilter,
  handleApplyDateFilter,
}: IRangeDatePickerProps) => {
  const selectedDate = {
    from: date.from ?? new Date(),
    to: date.to ?? new Date(),
  };
  const [dateState, setDateState] = useState<DateRange | undefined>(
    selectedDate
  );

  const isDisabled = !dateState?.from || !dateState?.to;

  const handleReset = () => {
    setDateState(undefined);
    handleResetDateFilter();
  };

  const handleApply = () => {
    if (dateState?.from && dateState.to) {
      const formattedRange = {
        from: format(dateState.from, "yyyy-MM-dd ") as unknown as Date,
        to: format(dateState.to, "yyyy-MM-dd ") as unknown as Date,
      };

      handleApplyDateFilter(formattedRange);
    }
  };

  return (
    <div className={cn("grid gap-2", classNames?.wrapper)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              classNames?.button
            )}
          >
            <CalendarIcon />
            {selectedDate.from ? (
              date.to ? (
                <>
                  {format(selectedDate.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(selectedDate.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateState?.from}
            selected={dateState}
            onSelect={setDateState}
            numberOfMonths={2}
          />
          <div className="w-full flex items-center gap-x-2 p-4">
            <Button
              variant="outline"
              disabled={isDisabled}
              className="w-full"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              disabled={isDisabled}
              className="w-full"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RangeDatePicker;
