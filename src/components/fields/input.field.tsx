"use client";

import { z } from "zod";
import {
  useFormContext,
  UseFormReturn,
  Path,
  PathValue,
} from "react-hook-form";
import toast from "react-hot-toast";

import * as FormComponent from "@/components/ui/form";
import { generateRandomSlug } from "@/lib/functions/generate-random-slug";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ErrorToolTip from "./error.tooltip";
import { cn } from "@/lib/utils";

interface InputFieldProps<T extends z.ZodTypeAny> {
  schema: T;
  name: string;
  label: string;
  minLength?: number;
  maxLength?: number;
  placeholder: string;
  description?: string;
  featuredField?: boolean;
  showDescription?: boolean;
  form: UseFormReturn<z.infer<T>>;
  className?: string;
}

const InputField = <T extends z.ZodTypeAny>({
  form,
  name,
  label,
  placeholder,
  description,
  minLength = 3,
  maxLength = 120,
  featuredField = false,
  showDescription = false,
  className,
}: InputFieldProps<T>) => {
  const { control } = useFormContext();

  const handleGenerateSlug = (stringToGenerate: string) => {
    if (!stringToGenerate) {
      toast.error("Для генерації slug введіть текст у поле");
      return;
    }

    const slug = generateRandomSlug({
      stringToGenerate,
      isRandowSuffix: featuredField,
    });
    form.setValue(
      "slug" as Path<z.infer<T>>,
      slug as PathValue<z.infer<T>, Path<z.infer<T>>>
    );
  };

  return (
    <FormComponent.FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormComponent.FormItem className={cn(className)}>
          <div className="flex justify-between items-center">
            <FormComponent.FormLabel>{label}</FormComponent.FormLabel>
            {featuredField && (
              <Button
                type="button"
                size="link"
                variant="link"
                onClick={() => handleGenerateSlug(field.value)}
              >
                Створити Slug
              </Button>
            )}
          </div>
          <div className="flex items-center">
            <FormComponent.FormControl className="flex-1">
              <Input
                {...field}
                value={field.value || ""}
                maxLength={maxLength}
                minLength={minLength}
                placeholder={placeholder}
                onChange={(e) => {
                  field.onChange(e);
                  if (name === "name") {
                    handleGenerateSlug(e.target.value);
                  }
                }}
              />
            </FormComponent.FormControl>
            <ErrorToolTip fieldState={fieldState} />
          </div>
          <FormComponent.FormDescription hidden={!showDescription}>
            {description}
          </FormComponent.FormDescription>
        </FormComponent.FormItem>
      )}
    />
  );
};

export default InputField;
