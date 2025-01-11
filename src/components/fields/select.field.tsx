"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import * as FormComponent from "@/components/ui/form";
import * as PopoverComponent from "@/components/ui/popover";
import * as CommandComponent from "@/components/ui/command";
import { CategoryType } from "@/lib/schemas/category.schema";

import { Button } from "../ui/button";
import ErrorToolTip from "./error.tooltip";
import NewCategorySheet from "../sheets/new-category-sheet/new-category.sheet";
import NewCategoryForm from "../forms/new-category-form/new-category.form";
import { cn } from "@/lib/utils";
import ScrollArea from "../scroll-area";
import toast from "react-hot-toast";

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
    const isDuplicateName = options.some(
      (option) =>
        option.id === newCategory.id || option.name === newCategory.name
    );
    const isDuplicateSlug = options.some(
      (option) =>
        option.slug === newCategory.slug && option.id !== newCategory.id
    );

    if (isDuplicateName) {
      toast.error("Категорія з таким іменем вже існує.");
      return;
    }
    if (isDuplicateSlug) {
      toast.error("Категорія з таким slug вже існує.");
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
            <FormComponent.FormLabel>{placeholder}</FormComponent.FormLabel>

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
                      <div className="flex gap-x-2">
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

                      {options.length ? (
                        <>
                          <CommandComponent.CommandGroup>
                            {options.map((option, index) => (
                              <Button
                                key={index}
                                onClick={() => field.onChange(option)}
                                variant={"ghost"}
                                className="w-full flex justify-between"
                              >
                                <p className="flex 1 text-left">
                                  {option.name}
                                </p>
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
                        <>
                          <CommandComponent.CommandEmpty>
                            Немає результатів
                          </CommandComponent.CommandEmpty>
                        </>
                      )}
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
