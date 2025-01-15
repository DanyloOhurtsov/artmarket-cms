import React from "react";
import { EllipsisVerticalIcon, Trash2Icon } from "lucide-react";

import * as PopoverComponent from "@/components/ui/popover";
import * as AlertDialogComponent from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";

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
        <AlertDialogComponent.AlertDialog>
          <AlertDialogComponent.AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              disabled={isDisabled}
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
          </AlertDialogComponent.AlertDialogTrigger>
          <AlertDialogComponent.AlertDialogContent>
            <AlertDialogComponent.AlertDialogHeader>
              <AlertDialogComponent.AlertDialogTitle>
                Ви впевнені, що хочете видалити ці категорії
              </AlertDialogComponent.AlertDialogTitle>
            </AlertDialogComponent.AlertDialogHeader>
            <AlertDialogComponent.AlertDialogFooter>
              <AlertDialogComponent.AlertDialogCancel>
                Скасувати
              </AlertDialogComponent.AlertDialogCancel>
              <AlertDialogComponent.AlertDialogAction
                asChild
                className="bg-destructive"
              >
                <Button variant={"destructive"} onClick={onClick}>
                  Видалити
                </Button>
              </AlertDialogComponent.AlertDialogAction>
            </AlertDialogComponent.AlertDialogFooter>
          </AlertDialogComponent.AlertDialogContent>
        </AlertDialogComponent.AlertDialog>
      </PopoverComponent.PopoverContent>
    </PopoverComponent.Popover>
  );
};

export default DeleteDropdownButton;
