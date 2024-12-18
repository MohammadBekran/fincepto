/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadIcon } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { INITIAL_TRANSACTIONS_IMPORT_RESULTS } from "@/features/transactions/core/constants";

import { Button } from "@/components/ui/button";

const UploadTransactionButton = ({
  onUpload,
}: {
  onUpload: (results: typeof INITIAL_TRANSACTIONS_IMPORT_RESULTS) => void;
}) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <UploadIcon className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};

export default UploadTransactionButton;
