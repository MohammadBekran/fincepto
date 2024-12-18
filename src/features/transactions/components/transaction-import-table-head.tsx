import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ITransactionImportTableHeadProps {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
}

const options = ["amount", "payee", "date"];

const TransactionImportTableHead = ({
  columnIndex,
  selectedColumns,
  onChange,
}: ITransactionImportTableHeadProps) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelection ?? ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "border-none outline-none capitalize bg-transparent focus:ring-offset-0 focus:ring-transparent",
          {
            "text-blue-500": currentSelection,
          }
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map((option) => {
          const isDisabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;

          return (
            <SelectItem
              key={option}
              disabled={isDisabled}
              value={option}
              className="capitalize"
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TransactionImportTableHead;
