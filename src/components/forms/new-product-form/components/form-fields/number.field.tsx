import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberFieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  placeholder: string;
  featuredField?: boolean;
  min?: number;
}

const NumberField = ({
  field,
  placeholder,
  featuredField,
  min = 1,
}: NumberFieldProps) => {
  return (
    <div className="flex">
      <Input
        type="number"
        placeholder={placeholder}
        {...field}
        min={min}
        onFocus={(e) => e.target.select()}
        className="flex-1"
        value={field.value || 0}
        onChange={(e) => {
          const value = e.target.value ? parseFloat(e.target.value) : null;
          field.onChange(value);
        }}
      />
      {featuredField && (
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => field.onChange(null)}
        >
          Reset
        </Button>
      )}
    </div>
  );
};

export default NumberField;
