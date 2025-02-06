"use client";

import React, { useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import toast from "react-hot-toast";
import { CheckCheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  title: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
  type?: "main" | "secondary";
}

const CopyButton = ({
  title,
  size = "link",
  variant = "ghost",
  className,
  type = "main",
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = (copyText: string) => {
    navigator.clipboard.writeText(copyText);
    toast.success(`Скопійовано: ${copyText}`);

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const IconForCopyButton = isCopied ? CheckCheckIcon : CopyIcon;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => handleCopy(title)}
      className={cn(
        "w-full justify-between px-2 py-1 group hover:bg-transparent",
        className
      )}
    >
      <p
        className={cn(
          type === "main" ? "text-xl font-bold" : "text-sm font-light"
        )}
      >
        {title}
      </p>
      <IconForCopyButton
        size={24}
        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
      />
    </Button>
  );
};

export default CopyButton;
