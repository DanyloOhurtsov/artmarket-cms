import React, { memo } from "react";
import {
  Path,
  PathValue,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";
import { CircleAlertIcon } from "lucide-react";

import * as FormComponent from "@/components/ui/form";
import { CategoryType } from "@/lib/schemas/category.schema";
import { generateRandomSlug } from "@/lib/functions/generate-random-slug";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import HoverTooltip from "../hover-tooltip";
import InputField from "./components/input.field";
import SwitchField from "./components/swich.field";
import NumberField from "./components/number.field";
import SelectField from "./components/select.field";
import UploadField from "./components/upload.field";
import toast from "react-hot-toast";

interface UniversalFieldProps<T extends z.ZodTypeAny> {
  form: UseFormReturn<z.infer<T>>;
  label: string;
  name: Path<z.infer<T>>;
  description?: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  type?: "input" | "textarea" | "checkbox" | "number" | "select" | "upload";
  options?: CategoryType[];

  featuredField?: {
    generateSlug?: boolean;
    resetField?: boolean;
  };
  showDescription?: boolean;
  schema: T;
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>;
}

const UniversalField = memo(
  <T extends z.ZodTypeAny>({
    form,
    label,
    name,
    placeholder,
    minLength = 3,
    maxLength = 100,
    type = "input",
    options,
    featuredField = {
      generateSlug: false,
      resetField: false,
    },
    showDescription = false,
    description,
    schema,
    setFiles,
  }: UniversalFieldProps<T>) => {
    const { control } = useFormContext();

    const handleGenerateClick = () => {
      const productName = form.getValues("name" as Path<z.infer<T>>) as string;

      if (productName !== "") {
        const slug = generateRandomSlug({
          stringToGenerate: productName,
          isRandowSuffix: true,
        });

        form.setValue(
          "slug" as Path<z.infer<T>>,
          slug as PathValue<z.infer<T>, Path<z.infer<T>>>
        );
      } else {
        toast.error("Будь ласка, введіть назву товару");
      }
    };

    return (
      <FormComponent.FormField
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error;
          return (
            <FormComponent.FormItem>
              <div className="flex justify-between">
                <FormComponent.FormLabel>{label}</FormComponent.FormLabel>

                {featuredField.generateSlug && (
                  <Button
                    type="button"
                    size="link"
                    variant={"link"}
                    onClick={handleGenerateClick}
                  >
                    Рандомний Slug
                  </Button>
                )}
              </div>
              <div className="flex items-center">
                <FormComponent.FormControl className="flex-1">
                  <div>
                    {/* Input */}
                    {type === "input" && (
                      <InputField
                        form={form}
                        field={field}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        minLength={minLength}
                        name={name}
                        schema={schema}
                      />
                    )}
                    {/* Textarea */}
                    {type === "textarea" && (
                      <Textarea placeholder={placeholder} {...field} />
                    )}
                    {/* Checkbox */}
                    {type === "checkbox" && (
                      <SwitchField
                        field={field}
                        placeholder={placeholder}
                        name={name}
                      />
                    )}
                    {/* Number */}
                    {type === "number" && (
                      <NumberField
                        field={field}
                        placeholder={placeholder}
                        featuredField={featuredField.resetField}
                      />
                    )}
                    {/* Select */}
                    {type === "select" && (
                      <SelectField
                        field={field}
                        options={options}
                        placeholder={placeholder}
                      />
                    )}
                    {/* Upload */}
                    {type === "upload" && setFiles && (
                      <UploadField setFiles={setFiles} />
                    )}
                  </div>
                </FormComponent.FormControl>
                {hasError && (
                  <HoverTooltip content={fieldState.error?.message} side="left">
                    <FormComponent.FormMessage className="px-2">
                      <CircleAlertIcon size={24} />
                    </FormComponent.FormMessage>
                  </HoverTooltip>
                )}
              </div>

              {showDescription && (
                <FormComponent.FormDescription>
                  {description}
                </FormComponent.FormDescription>
              )}
            </FormComponent.FormItem>
          );
        }}
      />
    );
  }
);

UniversalField.displayName = "UniversalField";

export default UniversalField;
