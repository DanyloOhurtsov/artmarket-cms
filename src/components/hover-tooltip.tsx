import { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface HoverTooltipProps {
  children: ReactNode;
  content: string | ReactNode;
  asChild?: boolean;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}

const HoverTooltip = ({
  children,
  content,
  asChild = false,
  className,
  side = "top",
  delayDuration = 200,
}: HoverTooltipProps) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild={asChild} className={className}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
};

export default HoverTooltip;
