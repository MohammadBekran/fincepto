"use client";

import { PlusIcon } from "lucide-react";

import CreateAccountModal from "@/features/accounts/components/create-account-modal";
import { useCreateAccountModal } from "@/features/accounts/core/hooks";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const Accounts = () => {
  const { open } = useCreateAccountModal();

  return (
    <div className="w-full max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Card className="border-bone drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle>Accounts page</CardTitle>
          <Button size="sm" onClick={open}>
            <PlusIcon className="size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>Hello</CardContent>
      </Card>
      <CreateAccountModal />
    </div>
  );
};

export default Accounts;
