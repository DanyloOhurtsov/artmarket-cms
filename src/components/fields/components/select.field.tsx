"use client";

import { useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as PopoverComponent from "@/components/ui/popover";
import * as CommandComponent from "@/components/ui/command";
import NewCategorySheet from "@/components/sheets/new-category-sheet/new-category.sheet";
import { CategoryType } from "@/lib/schemas/category.schema";
import NewCategoryForm from "@/components/forms/new-category-form/new-category.form";

interface SelectFieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  placeholder: string;
  options?: CategoryType[];
}

const SelectField = ({
  field,
  options: initialOptions,
  placeholder,
}: SelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (initialOptions) {
      setOptions(initialOptions);
    }
  }, [initialOptions]);

  const label =
    field.value.name !== "" && options && options.length > 0
      ? field.value.name
      : placeholder;

  const handleCategoryCreated = (newCategory: CategoryType) => {
    setOptions((prevOptions) => [...prevOptions, newCategory]);
    field.onChange(newCategory); // Вибираємо нову категорію автоматично
  };

  return (
    <PopoverComponent.Popover>
      <PopoverComponent.PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full flex justify-between">
          <p className="truncate flex-1 text-start">{label}</p>
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
              <NewCategoryForm
                onOpenChange={() => setOpen(!open)}
                onCategoryCreated={handleCategoryCreated}
              />
            </NewCategorySheet>
          </div>

          {initialOptions?.length ? (
            <>
              <CommandComponent.CommandGroup>
                {options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => field.onChange(option)}
                    variant={"ghost"}
                    className="w-full flex justify-between"
                  >
                    <p className="flex 1 text-left">{option.name}</p>
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value.name === option.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
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
