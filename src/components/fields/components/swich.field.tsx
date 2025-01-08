import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SwitchFieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  placeholder: string;
  name: string;
}

const SwitchField = ({ name, field, placeholder }: SwitchFieldProps) => {
  return (
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
  );
};

export default SwitchField;
