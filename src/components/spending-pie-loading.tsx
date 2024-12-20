import { Loader2 } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SpendingPieLoading = () => {
  return (
    <Card className="border-0 drop-shadow-0">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-full lg:w-[120px] lg:h-8" />
      </CardHeader>
      <CardContent>
        <div className="w-full h-[350px] flex justify-center items-center">
          <Loader2 className="size-6 animate-spin text-slate-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingPieLoading;
