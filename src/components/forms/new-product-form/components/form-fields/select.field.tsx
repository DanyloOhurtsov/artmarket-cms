import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import HoverTooltip from "@/components/hover-tooltip";
import * as PopoverComponent from "@/components/ui/popover";
import * as CommandComponent from "@/components/ui/command";

interface SelectFieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  placeholder: string;
  options?: { value: string; label: string }[];
}

const SelectField = ({ field, options, placeholder }: SelectFieldProps) => {
  console.log("SelectField", typeof options);

  const handleCreateCategory = () => {
    console.log("Create category");
  };

  return (
    <PopoverComponent.Popover>
      <PopoverComponent.PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full flex justify-between">
          <p className="truncate flex-1 text-start">
            {field.value && options?.length
              ? options?.find((option) => option.value === field.value)?.label
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
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={handleCreateCategory}
            >
              <HoverTooltip content="Додати новий елемент" asChild>
                <PlusCircleIcon size={24} />
              </HoverTooltip>
            </Button>
          </div>
          {options?.length ? (
            <>
              <CommandComponent.CommandEmpty>
                Немає результатів
              </CommandComponent.CommandEmpty>
              <CommandComponent.CommandGroup>
                {options?.map((option) => (
                  <CommandComponent.CommandItem
                    key={option.value}
                    value={option.value}
                    onClick={() => field.onChange(option.value)}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandComponent.CommandItem>
                ))}
              </CommandComponent.CommandGroup>
            </>
          ) : null}
        </CommandComponent.Command>
      </PopoverComponent.PopoverContent>
    </PopoverComponent.Popover>
  );
};

export default SelectField;
