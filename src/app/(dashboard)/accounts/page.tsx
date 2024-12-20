import type { Metadata } from "next";

import Accounts from "@/features/accounts/components";

export const dynamic = "force-dynamic";

const AccountsPage = () => {
  return <Accounts />;
};

export const metadata: Metadata = {
  title: "Accounts",
  description: "manage all of your accounts",
};

export default AccountsPage;
