import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const HomeSummaryCardLoading = () => {
  return (
    <Card className="flex flex-col justify-between border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-4- h-4" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-24 h1-0 shrink-0 mb-2" />
        <Skeleton className="w-40 h-4 shrink-0" />
      </CardContent>
    </Card>
  );
};

export default HomeSummaryCardLoading;
