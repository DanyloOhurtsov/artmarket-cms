"use client";

import { z } from "zod";
import { useFormContext } from "react-hook-form";

import * as FormComponent from "@/components/ui/form";

import { Input } from "../ui/input";
import ErrorToolTip from "./error.tooltip";

interface NumberFieldProps<T extends z.ZodTypeAny> {
  schema: T;
  name: string;
  label: string;
  minValue?: number;
  placeholder: string;
  description?: string;
  initialValue?: number;
  showDescription?: boolean;
}

const NumberField = <T extends z.ZodTypeAny>({
  name,
  label,
  placeholder,
  minValue = 0,
  description,
  initialValue = 0,
  showDescription = false,
}: NumberFieldProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormComponent.FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormComponent.FormItem>
          <div className="flex justify-between items-center">
            <FormComponent.FormLabel>{label}</FormComponent.FormLabel>
          </div>
          <div className="flex items-center">
            <FormComponent.FormControl className="flex-1">
              <div className="flex">
                <Input
                  {...field}
                  type="number"
                  placeholder={placeholder}
                  min={minValue}
                  className="flex-1"
                  onFocus={(e) => e.target.select()}
                  value={field.value || initialValue}
                  onChange={(e) => {
                    const value = e.target.value
                      ? parseFloat(e.target.value)
                      : null;
                    field.onChange(value);
                  }}
                />
              </div>
            </FormComponent.FormControl>

            <ErrorToolTip fieldState={fieldState} />
          </div>
          {showDescription && (
            <FormComponent.FormDescription>
              {description}
            </FormComponent.FormDescription>
          )}
        </FormComponent.FormItem>
      )}
    />
  );
};

export default NumberField;
