import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface ITooltipProps {
  asChild?: boolean;
  triggerContent: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip = ({
  asChild = false,
  triggerContent,
  children,
}: ITooltipProps) => {
  return (
    <TooltipProvider>
      <UITooltip>
        <TooltipTrigger asChild={asChild}>{triggerContent}</TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
