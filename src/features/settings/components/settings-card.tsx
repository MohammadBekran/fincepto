"use client";

import { Loader2 } from "lucide-react";

import PlaidConnect from "@/features/plaid/components/plaid-connect";
import PlaidDisconnect from "@/features/plaid/components/plaid-disconnect";
import { useGetConnectedBank } from "@/features/plaid/core/services/api/queries.api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const SettingsCard = () => {
  const { data: connectedBank, isLoading: isConnectedBankLoading } =
    useGetConnectedBank();

  if (isConnectedBankLoading) {
    return (
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <Skeleton className="w-24 h-6" />
        </CardHeader>
        <CardContent>
          <div className="w-full h-[350px] flex justify-center items-center">
            <Loader2 className="size-6 animate-spin text-slate-300" />
          </div>
        </CardContent>
      </Card>
    );
  }

  console.log({ connectedBank });

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="flex flex-col items-center gap-y-2 py-4 lg:flex-row">
          <p className="w-full text-sm font-medium lg:w-[16.5rem]">
            Bank account
          </p>
          <div className="w-full flex justify-between items-center">
            <div
              className={cn("flex items-center text-sm truncate", {
                "text-muted-foreground": !connectedBank?.data,
              })}
            >
              {connectedBank?.data
                ? "Bank account connected"
                : "No bank account connected"}
            </div>
            {connectedBank?.data ? <PlaidDisconnect /> : <PlaidConnect />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
