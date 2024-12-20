import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface INavigationButtonProps {
  label: string;
  href: string;
  isActive: boolean;
}

const NavigationButton = ({
  label,
  href,
  isActive,
}: INavigationButtonProps) => {
  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(
        "w-full justify-between border-none outline-none transition font-normal text-white hover:bg-white/20 hover:text-white focus-visible:ring-offset-0 focus-visible:ring-transparent focus:bg-white/30 lg:w-auto",
        isActive ? "bg-white/10 text-white" : "bg-transparent"
      )}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavigationButton;
