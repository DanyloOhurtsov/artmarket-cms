import React from "react";

interface ScrollAreaProps {
  children: React.ReactNode;
}

const ScrollArea = ({ children }: ScrollAreaProps) => {
  return (
    <div className="h-full overflow-y-auto pl-1 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      {children}
    </div>
  );
};

export default ScrollArea;
