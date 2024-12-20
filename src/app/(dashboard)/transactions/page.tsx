import type { Metadata } from "next";

import Transactions from "@/features/transactions/components";

export const dynamic = "force-dynamic";

const TransactionsPage = () => {
  return <Transactions />;
};

export const metadata: Metadata = {
  title: "Transactions",
  description: "manage all of your transactions",
};

export default TransactionsPage;
