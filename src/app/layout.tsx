import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ClerkProvider from "@/components/partials/providers/clerk-provider";
import NuqsProvider from "@/components/partials/providers/nuqs-provider";
import QueryClientProvider from "@/components/partials/providers/query-client-provider";
import ToastProvider from "@/components/partials/providers/toast-provider";

import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fincepto",
  description: "A finance management platform",
  icons: {
    icon: "/logo.svg",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("antialiased", inter.className)}>
          <QueryClientProvider>
            <NuqsProvider>
              <ToastProvider />
              {children}
            </NuqsProvider>
          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
