import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface ITooltipProps {
  triggerContent: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip = ({ triggerContent, children }: ITooltipProps) => {
  return (
    <TooltipProvider>
      <UITooltip>
        <TooltipTrigger>{triggerContent}</TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
