import type { Metadata } from "next";

import Dashboard from "@/features/dashboard/components";

export const dynamic = "force-dynamic";

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "manage all of your data",
};
