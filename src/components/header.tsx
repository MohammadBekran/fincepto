import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import Logo from "@/components/logo";
import Navigation from "@/components/navigation";

const Header = () => {
  return (
    <header className="py-8 px-4 pb-36 bg-gradient-to-b from-blue-700 to-blue-500 lg:px-14">
      <div className="flex justify-between">
        <div className="flex items-center lg:gap-x-16">
          <Logo />
          <Navigation />
        </div>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="size-8 animate-spin text-slate-400" />
        </ClerkLoading>
      </div>
    </header>
  );
};

export default Header;
