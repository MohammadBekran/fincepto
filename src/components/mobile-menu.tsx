import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAVIGATION_ITEMS } from "@/core/constants";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClickNavigationItem = ({ href }: { href: string }) => {
    router.push(href);

    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border-none outline-none transition font-normal bg-white/10 text-white hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-0 focus-visible:ring-transparent"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-2">
        <VisuallyHidden>
          <SheetTitle />
        </VisuallyHidden>
        <div className="space-y-2 pt-6">
          {NAVIGATION_ITEMS.map((item) => {
            const { label, href } = item;

            const isActive = pathname === href;
            const variant = isActive ? "secondary" : "ghost";

            return (
              <Button
                key={href}
                variant={variant}
                onClick={() => handleClickNavigationItem({ href })}
                className="w-full justify-normal"
              >
                {label}
              </Button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
