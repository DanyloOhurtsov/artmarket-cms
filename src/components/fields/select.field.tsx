"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  SearchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import * as FormComponent from "@/components/ui/form";
import * as PopoverComponent from "@/components/ui/popover";
import * as CommandComponent from "@/components/ui/command";

import { CollectionType } from "@/lib/schemas/new/collection.schema";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ErrorToolTip from "./error.tooltip";

interface SelectFieldProps {
  name: string;
  placeholder: string;
  initialOptions: CollectionType[];
}

const SelectField = ({
  name,
  placeholder,
  initialOptions,
}: SelectFieldProps) => {
  const { control } = useFormContext();
  const [options, setOptions] = useState<CollectionType[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<CollectionType[]>([]);

  useEffect(() => {
    if (initialOptions) {
      setOptions(initialOptions);
      setFilteredOptions(initialOptions);
    }
  }, [initialOptions]);

  useEffect(() => {
    const results = options.filter((option) =>
      option.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(results);
  }, [searchTerm, options]);

  const hasCategories = options.length > 0;

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
                      <div className="flex items-center gap-x-2">
                        <Input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Знайти..."
                        />
                        <SearchIcon
                          className="h-4 w-4 shrink-0 opacity-50"
                          size={24}
                        />
                      </div>
                      {/* <CommandComponent.CommandInput
                        placeholder="Знайти..."
                        className="flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      /> */}

                      {filteredOptions.length ? (
                        <>
                          <CommandComponent.CommandGroup>
                            {filteredOptions.map((option, index) => (
                              <Button
                                key={index}
                                onClick={() => field.onChange(option)}
                                variant={"ghost"}
                                className="w-full flex justify-between"
                              >
                                <p className="flex 1 text-left">
                                  {option.title}
                                </p>
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value.name === option.title
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
                          {hasCategories ? (
                            <CommandComponent.CommandEmpty>
                              Немає результатів
                            </CommandComponent.CommandEmpty>
                          ) : (
                            <CommandComponent.CommandEmpty>
                              <AlertTriangleIcon className="h-5 w-5" />
                              <p>
                                Спочатку створіть категорію, щоб її вибрати.
                              </p>
                            </CommandComponent.CommandEmpty>
                          )}
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
