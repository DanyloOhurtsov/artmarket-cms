import { Input } from "@/components/ui/input";
import React from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";

interface UploadFieldProps<T extends z.ZodTypeAny> {
  form: UseFormReturn<z.infer<T>>;
  field: ControllerRenderProps<FieldValues, string>;
  schema: T;
}

const UploadField = <T extends z.ZodTypeAny>({
  field,
  form,
}: UploadFieldProps<T>) => {


  return (
    <>
      <Input
        {...field}
        type="file"
        multiple={false} // Залежить від ваших вимог
      />
    </>
  );
};

export default UploadField;