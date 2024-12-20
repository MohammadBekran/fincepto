import type { Metadata } from "next";

import Dashboard from "@/features/dashboard/components";

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "manage all of your data",
};
