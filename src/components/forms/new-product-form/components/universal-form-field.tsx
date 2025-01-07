import { z } from "zod";
import { memo } from "react";
import { CircleAlertIcon } from "lucide-react";
import { useFormContext, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import HoverTooltip from "@/components/hover-tooltip";
import * as FormComponent from "@/components/ui/form";
import { generateRandomSlug } from "@/lib/functions/generate-random-slug";

import { productSchema } from "../product.schema";
import SelectField from "./form-fields/select.field";
import NumberField from "./form-fields/number.field";
import SwitchField from "./form-fields/switch.field";

interface UniversalFormFieldProps {
  form: UseFormReturn<z.infer<typeof productSchema>>;
  label: string;
  name: string;
  description?: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  type?: "input" | "textarea" | "checkbox" | "number" | "select";
  options?: { value: string; label: string }[];

  featuredField?: {
    generateSlug?: boolean;
    resetField?: boolean;
  };
  showDescription?: boolean;
}

const UniversalFormField = memo(
  ({
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
  }: UniversalFormFieldProps) => {
    const { control } = useFormContext();

    const handleGenerateSlug = (name: string) => {
      const slug = generateRandomSlug({ stringToGenerate: name });
      form.setValue("slug", slug);
    };

    const handleGenerateClick = () => {
      if (form.getValues().name !== "") {
        const slug = generateRandomSlug({
          stringToGenerate: form.getValues().name,
          isRandowSuffix: true,
        });

        form.setValue("slug", slug);
      } else {
        alert("Будь ласка, введіть назву товару");
      }
    };

    return (
      <FormComponent.FormField
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error;
          return (
            <FormComponent.FormItem className="">
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

UniversalFormField.displayName = "UniversalFormField";

export default UniversalFormField;
