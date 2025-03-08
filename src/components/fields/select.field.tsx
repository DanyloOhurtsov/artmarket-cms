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
  selectedOptions: CollectionType[];
  setSelectedOptions: (options: CollectionType[]) => void;
  isMulti?: boolean;
}

const SelectField = ({
  name,
  placeholder,
  initialOptions,
  selectedOptions,
  setSelectedOptions,
  isMulti = false,
}: SelectFieldProps) => {
  const { control } = useFormContext();
  const [options, setOptions] = useState<CollectionType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (initialOptions) {
      setOptions(initialOptions);
    }
  }, [initialOptions]);

  const handleSelect = (option: CollectionType) => {
    if (isMulti) {
      const isSelected = selectedOptions.some((item) => item.id === option.id);
      if (isSelected) {
        setSelectedOptions(
          selectedOptions.filter((item) => item.id !== option.id)
        );
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
    }
  };

  return (
    <FormComponent.FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormComponent.FormItem>
          <FormComponent.FormLabel>{placeholder}</FormComponent.FormLabel>
          <PopoverComponent.Popover>
            <PopoverComponent.PopoverTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                <p className="truncate">
                  {selectedOptions.length > 0
                    ? selectedOptions.map((opt) => opt.title).join(", ")
                    : placeholder}
                </p>
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverComponent.PopoverTrigger>
            <PopoverComponent.PopoverContent>
              <CommandComponent.Command>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Знайти..."
                />
                <CommandComponent.CommandGroup>
                  {options
                    .filter((opt) =>
                      opt.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((option) => (
                      <Button
                        key={option.id}
                        variant="ghost"
                        className="w-full flex justify-between"
                        onClick={() => handleSelect(option)}
                      >
                        <p>{option.title}</p>
                        {selectedOptions.some(
                          (item) => item.id === option.id
                        ) && <CheckIcon className="h-4 w-4" />}
                      </Button>
                    ))}
                </CommandComponent.CommandGroup>
              </CommandComponent.Command>
            </PopoverComponent.PopoverContent>
          </PopoverComponent.Popover>
        </FormComponent.FormItem>
      )}
    />
  );
};

export default SelectField;
