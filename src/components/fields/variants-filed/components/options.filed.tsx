import {
  productSchema,
  ProductVariantType,
} from "@/lib/schemas/product.schema";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import InputField from "../../input.field";



interface OptionsFieldProps {
  name: string;
  variantIndex: number;
  removeVariant: () => void;
  form: UseFormReturn<z.infer<typeof productSchema>>;
  value: ProductVariantType;
}
const OptionsField = ({
  form,
  name,
  variantIndex,
  removeVariant,
  value,
}: OptionsFieldProps) => {
  return (
    <div>
      <InputField
        form={form}
        schema={productSchema}
        name={`${name}.name`}
        label=""
        placeholder="Наприклад: Колір"
      />
    </div>
  );
};

export default OptionsField;
