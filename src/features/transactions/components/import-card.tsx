/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertAmountToMiliunits } from "@/lib/utils";
import { format, parse } from "date-fns";
import { useState } from "react";

import ImportTransactionsTable from "@/features/transactions/components/import-transactions-table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { transactions as transactionsSchema } from "@/db/schema";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface ISelectedColumnState {
  [key: string]: string | null;
}

interface IImportCardProps {
  data: string[][];
  disabled: boolean;
  onCancel: () => void;
  onSubmit: (data: (typeof transactionsSchema.$inferInsert)[]) => void;
}

const ImportCard = ({
  data,
  disabled,
  onCancel,
  onSubmit,
}: IImportCardProps) => {
  const [selectedColumns, setSelectedColumns] = useState<ISelectedColumnState>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  const handleTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;

      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;
  const isDisabled = progress < requiredOptions.length || disabled;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);

        return selectedColumns[`column_${columnIndex}`] ?? null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);

            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];

        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMiliunits({ amount: parseFloat(item.amount) }),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }));

    onSubmit(formattedData);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Card className="border-bone drop-shadow-sm">
        <CardHeader className="gap-2 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle>Import Transactions</CardTitle>
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            <Button
              size="sm"
              disabled={disabled}
              className="w-full lg:w-auto"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={isDisabled}
              className="w-full lg:w-auto"
              onClick={handleContinue}
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTransactionsTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={handleTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCard;
