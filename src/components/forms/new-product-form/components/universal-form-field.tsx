import { memo } from "react";
import { CircleAlertIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import HoverTooltip from "@/components/hover-tooltip";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { generateRandomSlug } from "@/lib/functions/generate-random-slug";

interface UniversalFormFieldProps {
  form: UseFormReturn<any>;
  label: string;
  name: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  type?: "input" | "textarea" | "checkbox" | "number" | "select";
  options?: { value: string; label: string }[];

  featuredField?: {
    generateSlug?: boolean;
    resetField?: boolean;
  };
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
  }: UniversalFormFieldProps) => {
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
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error;

          return (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>{label}</FormLabel>

                {featuredField.generateSlug && (
                  <Button
                    variant={"link"}
                    size="link"
                    onClick={handleGenerateClick}
                  >
                    Рандомний Slug
                  </Button>
                )}
              </div>
              <div className="flex items-center">
                <FormControl className="flex-1">
                  <div>
                    {/* Input */}
                    {type === "input" && (
                      <Input
                        placeholder={placeholder}
                        {...field}
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
                      <div className="flex items-center gap-x-2">
                        <Switch
                          {...field}
                          id={name}
                          checked={field.value}
                          onCheckedChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                        <Label htmlFor={name}>{placeholder}</Label>
                      </div>
                    )}
                    {/* Number */}
                    {type === "number" && (
                      <div className="flex">
                        <Input
                          type="number"
                          placeholder={placeholder}
                          {...field}
                          onFocus={(e) => e.target.select()}
                          className="flex-1"
                          value={field.value || ""} // Значення за замовчуванням
                          onChange={(e) => {
                            const value = e.target.value
                              ? parseFloat(e.target.value)
                              : null;
                            field.onChange(value);
                          }}
                        />
                        {featuredField.resetField && (
                          <Button
                            type="button"
                            variant={"ghost"}
                            onClick={() => field.onChange(null)}
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                    )}
                    {/* Select */}
                  </div>
                </FormControl>
                {hasError && (
                  <HoverTooltip content={fieldState.error?.message} side="left">
                    <FormMessage className="px-2">
                      <CircleAlertIcon size={24} />
                    </FormMessage>
                  </HoverTooltip>
                )}
              </div>
            </FormItem>
          );
        }}
      />
    );
  }
);

export default UniversalFormField;
