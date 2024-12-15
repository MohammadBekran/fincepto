"use client";

import { usePathname } from "next/navigation";
import { useMedia } from "react-use";

import NavigationButton from "@/components/navigation-button";
import MobileMenu from "@/components/mobile-menu";
import { NAVIGATION_ITEMS } from "@/core/constants";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  if (isMobile) return <MobileMenu />;

  return (
    <div className="hidden overflow-x-auto items-center gap-x-2 lg:flex">
      {NAVIGATION_ITEMS.map((item) => {
        const { label, href } = item;

        const isActive = pathname === href;

        return (
          <NavigationButton
            key={href}
            label={label}
            href={href}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};

export default Navigation;
