import { cn } from "@/lib/utils";
import React from "react";

interface ScrollAreaProps {
  children: React.ReactNode;
  isScrollbarVisible?: boolean;
}

const ScrollArea = ({
  children,
  isScrollbarVisible = true,
}: ScrollAreaProps) => {
  return (
    <div
      className={cn(
        "h-full overflow-y-auto pl-1 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",

        isScrollbarVisible === false && "[&::-webkit-scrollbar]:w-0"
      )}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
