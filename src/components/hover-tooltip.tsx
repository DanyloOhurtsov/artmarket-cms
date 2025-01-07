import { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface HoverTooltipProps {
  children: ReactNode;
  content: string | ReactNode;
  asChild?: boolean;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

const HoverTooltip = ({
  children,
  content,
  asChild = false,
  className,
  side = "top",
}: HoverTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild} className={className}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
};

export default HoverTooltip;
