"use client";

import { z } from "zod";
import { useFormContext } from "react-hook-form";

import * as FormComponent from "@/components/ui/form";

import { Textarea } from "../ui/textarea";
import ErrorToolTip from "./error.tooltip";

interface TextareaFieldProps<T extends z.ZodTypeAny> {
  schema: T;
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  showDescription?: boolean;
  minLength?: number;
  maxLength?: number;
}

const TextareaField = <T extends z.ZodTypeAny>({
  name,
  label,
  placeholder,
  description,
  showDescription = false,
  minLength = 3,
  maxLength = 3000,
}: TextareaFieldProps<T>) => {
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
              <Textarea
                {...field}
                maxLength={maxLength}
                minLength={minLength}
                placeholder={placeholder}
              />
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

export default TextareaField;
