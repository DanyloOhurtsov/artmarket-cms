import { Input } from "@/components/ui/input";
import { generateRandomSlug } from "@/lib/functions/generate-random-slug";
import React from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";

interface InputFieldProps<T extends z.ZodTypeAny> {
  form: UseFormReturn<z.infer<T>>;
  field: ControllerRenderProps<FieldValues, string>;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  name: string;
  schema: T;
}

const InputField = <T extends z.ZodTypeAny>({
  form,
  field,
  placeholder,
  maxLength,
  minLength,
  name,
}: InputFieldProps<T>) => {
  const handleGenerateSlug = (fieldName: string) => {
    const slug = generateRandomSlug({
      stringToGenerate: fieldName,
    });
    form.setValue(
      "slug" as Path<z.infer<T>>,
      slug as PathValue<z.infer<T>, Path<z.infer<T>>>
    );
  };

  return (
    <Input
      {...field}
      placeholder={placeholder}
      min={minLength}
      max={maxLength}
      onChange={(e) => {
        field.onChange(e);
        if (name === "name") {
          handleGenerateSlug(e.target.value);
        }
      }}
    />
  );
};

export default InputField;
