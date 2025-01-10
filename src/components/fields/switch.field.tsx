"use client";

import { useFormContext } from "react-hook-form";

import * as FormComponent from "@/components/ui/form";

import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import ErrorToolTip from "./error.tooltip";

interface SwitchFieldProps {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  showDescription?: boolean;
}

const SwitchField = ({
  name,
  label,
  placeholder,
  description,
  showDescription,
}: SwitchFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormComponent.FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormComponent.FormItem>
          <FormComponent.FormLabel>{label}</FormComponent.FormLabel>

          <div className="flex items-center">
            <FormComponent.FormControl className="flex-1">
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

export default SwitchField;
