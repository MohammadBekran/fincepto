import type { Metadata } from "next";
import { Suspense } from "react";

import Accounts from "@/features/accounts/components";

const AccountsPage = () => {
  return (
    <Suspense>
      <Accounts />;
    </Suspense>
  );
};

export const metadata: Metadata = {
  title: "Accounts",
  description: "manage all of your accounts",
};

export default AccountsPage;
