"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ChevronsUpDownIcon } from "lucide-react";

import * as FormComponent from "@/components/ui/form";
import * as PopoverComponent from "@/components/ui/popover";
import * as CommandComponent from "@/components/ui/command";
import { CategoryType } from "@/lib/schemas/category.schema";

import { Button } from "../ui/button";
import ErrorToolTip from "./error.tooltip";
import NewCategorySheet from "../sheets/new-category-sheet/new-category.sheet";
import NewCategoryForm from "../forms/new-category-form/new-category.form";

interface SelectFieldProps {
  name: string;
  placeholder: string;
  initialOptions: CategoryType[];
}

const SelectField = ({
  name,
  placeholder,
  initialOptions,
}: SelectFieldProps) => {
  const { control, setValue } = useFormContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (initialOptions) {
      setOptions(initialOptions);
    }
  }, [initialOptions]);

  const handleOpenClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCategoryCreated = (newCategory: CategoryType) => {
    const isDuplicate = options.some(
      (option) =>
        option.id === newCategory.id || option.name === newCategory.name
    );

    if (isDuplicate) {
      alert("Категорія з таким іменем вже існує.");
      return;
    }

    setOptions((prevOptions) => [...prevOptions, newCategory]);

    setValue(name, newCategory);
  };

  return (
    <FormComponent.FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const label =
          field.value && field.value.name ? field.value.name : placeholder;
        return (
          <FormComponent.FormItem>
            <FormComponent.FormLabel>{label}</FormComponent.FormLabel>

            <div className="flex items-center">
              <FormComponent.FormControl className="flex-1">
                <PopoverComponent.Popover>
                  <PopoverComponent.PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full flex justify-between"
                    >
                      <p className="truncate flex-1 text-start">{label}</p>
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverComponent.PopoverTrigger>
                  <PopoverComponent.PopoverContent>
                    <CommandComponent.Command>
                      <div>
                        <CommandComponent.CommandInput
                          placeholder="Знайти..."
                          className="flex-1"
                        />
                        <NewCategorySheet
                          isOpen={isOpen}
                          onOpenChange={handleOpenClose}
                          asChild
                        >
                          <NewCategoryForm
                            onOpenChange={handleOpenClose}
                            onCategoryCreated={handleCategoryCreated}
                          />
                        </NewCategorySheet>
                      </div>
                    </CommandComponent.Command>
                  </PopoverComponent.PopoverContent>
                </PopoverComponent.Popover>
              </FormComponent.FormControl>

              <ErrorToolTip fieldState={fieldState} />
            </div>
          </FormComponent.FormItem>
        );
      }}
    />
  );
};

export default SelectField;
