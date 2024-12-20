import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import Logo from "@/components/logo";
import Navigation from "@/components/navigation";
import WelcomeMessage from "@/components/welcome-message";
import Filters from "@/components/filters";

const Header = () => {
  return (
    <header className="py-8 px-4 pb-36 bg-gradient-to-b from-blue-700 to-blue-500 lg:px-14">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <Logo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton signInUrl="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </ClerkLoading>
        </div>
        <WelcomeMessage />
        <Filters />
      </div>
    </header>
  );
};

export default Header;
