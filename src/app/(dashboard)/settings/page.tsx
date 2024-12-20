import type { Metadata } from "next";

import Settings from "@/features/settings/components";

const SettingsPage = () => {
  return <Settings />;
};

export const metadata: Metadata = {
  title: "Settings",
  description: "settings page",
};

export default SettingsPage;
