"use client";

import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import HoverTooltip from "@/components/hover-tooltip";
import * as PopoverComponent from "@/components/ui/popover";
import * as CommandComponent from "@/components/ui/command";
import NewCategorySheet from "@/components/sheets/new-category-sheet/new-category.sheet";
import { CategoryType } from "@/lib/schemas/category.schema";

interface SelectFieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  placeholder: string;
  options?: CategoryType[];
}

const SelectField = ({ field, options, placeholder }: SelectFieldProps) => {
  const [open, setOpen] = useState(false);

  return (
    <PopoverComponent.Popover>
      <PopoverComponent.PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full flex justify-between">
          <p className="truncate flex-1 text-start">
            {field.value && options?.length
              ? options?.find((option) => option.name === field.value.name)
                  ?.name
              : placeholder}
          </p>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverComponent.PopoverTrigger>
      <PopoverComponent.PopoverContent>
        <CommandComponent.Command>
          <div className="flex gap-x-2">
            <CommandComponent.CommandInput
              placeholder="Знайти..."
              className="flex-1"
            />
            <NewCategorySheet
              isOpen={open}
              onOpenChange={() => setOpen(!open)}
              asChild
            >
              <Button variant={"ghost"} size={"icon"}>
                <HoverTooltip content="Додати новий елемент" asChild>
                  <PlusCircleIcon size={24} />
                </HoverTooltip>
              </Button>
            </NewCategorySheet>
          </div>

          {options?.length ? (
            <>
              <CommandComponent.CommandGroup>
                {options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => field.onChange(option)}
                    variant={"ghost"}
                    className="w-full flex justify-start"
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value.name === option.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <p className="flex 1 text-left bg-red-50">{option.name}</p>
                  </Button>
                ))}
              </CommandComponent.CommandGroup>
            </>
          ) : (
            <CommandComponent.CommandEmpty>
              Немає результатів
            </CommandComponent.CommandEmpty>
          )}
        </CommandComponent.Command>
      </PopoverComponent.PopoverContent>
    </PopoverComponent.Popover>
  );
};

export default SelectField;
