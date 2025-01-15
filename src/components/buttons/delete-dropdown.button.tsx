import React from "react";
import * as PopoverComponent from "@/components/ui/popover";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon, Trash2Icon } from "lucide-react";

interface DeleteDropdownButtonProps {
  isDisabled: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
}

const DeleteDropdownButton = ({
  isDisabled,
  onClick,
  icon,
  label,
}: DeleteDropdownButtonProps) => {
  const DefaultIcon = Trash2Icon; // Використовуємо як стандартну іконку

  return (
    <PopoverComponent.Popover>
      <PopoverComponent.PopoverTrigger asChild>
        <Button variant={"ghost"}>
          <EllipsisVerticalIcon size={24} />
        </Button>
      </PopoverComponent.PopoverTrigger>
      <PopoverComponent.PopoverContent className="mr-2">
        <Button
          variant="destructive"
          disabled={isDisabled}
          onClick={onClick}
          className="flex items-center gap-x-2 w-full"
        >
          {icon ? (
            typeof icon === "function" ? (
              React.createElement(icon)
            ) : (
              icon
            )
          ) : (
            <DefaultIcon />
          )}
          <p>{label}</p>
        </Button>
      </PopoverComponent.PopoverContent>
    </PopoverComponent.Popover>
  );
};

export default DeleteDropdownButton;
