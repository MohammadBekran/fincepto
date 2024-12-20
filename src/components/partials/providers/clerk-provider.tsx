import { ClerkProvider as NextClerkProvider } from "@clerk/nextjs";

const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextClerkProvider afterSignOutUrl="/sign-in">{children}</NextClerkProvider>
  );
};

export default ClerkProvider;
