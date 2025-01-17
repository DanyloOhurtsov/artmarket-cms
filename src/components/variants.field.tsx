import {
  productSchema,
  ProductVariantType,
} from "@/lib/schemas/product.schema";
import React, { useEffect, useState } from "react";
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import {
  CirclePlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Trash2Icon,
} from "lucide-react";
import toast from "react-hot-toast";
import AlertDialog from "@/components/alert-dialog";
import { motion } from "framer-motion";
import InputField from "./fields/input.field";
import { Button } from "./ui/button";
import OptionsTag from "./fields/variants-filed/components/options.tag";

interface VariantsOptionsFieldProps {
  form: UseFormReturn<z.infer<typeof productSchema>>;
}

const VariantsOptionsField = ({ form }: VariantsOptionsFieldProps) => {
  const { control, getValues } = form;
  const [isEditing, setIsEditing] = useState<number[]>([0]);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variants",
  });

  const variants = useWatch({ control, name: "variants" });

  useEffect(() => {
    variants?.forEach((variant, index) => {
      const allFilled = variant?.values?.every(
        (value: ProductVariantType) => value.name.trim() !== ""
      );

      if (allFilled) {
        update(index, {
          ...variant,
          values: [
            ...variant.values,
            {
              id: uuid(),
              name: "",
              value: "",
              slug: "",
            },
          ],
        });
      }
    });
  }, [variants, update]);

  const toggleEditing = (index: number) => {
    setIsEditing((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSave = (index: number) => {
    const variantName = getValues(`variants.${index}.name`);
    const values = getValues(`variants.${index}.values`);

    if (!variantName) {
      toast.error("Введіть назву варіанту");
      return;
    }

    const filteredValues = values.filter(
      (value: ProductVariantType) => value.name.trim() !== ""
    );

    if (filteredValues.length === 0) {
      toast.error("Варіант має мати щонайменше одну опцію");
      return;
    }

    update(index, {
      ...fields[index],
      name: variantName,
      values: filteredValues,
    });
    setIsEditing((prev) => prev.filter((i) => i !== index));
  };

  const handleRemoveOption = (variantIndex: number, optionIndex: number) => {
    const currentValues = getValues(`variants.${variantIndex}.values`);
    currentValues.splice(optionIndex, 1);
    update(variantIndex, {
      ...fields[variantIndex],
      values: currentValues,
    });
  };

  const moveUp = (variantIndex: number, optionIndex: number) => {
    const currentValues = [...getValues(`variants.${variantIndex}.values`)];
    if (optionIndex > 0) {
      const temp = currentValues[optionIndex];
      currentValues[optionIndex] = currentValues[optionIndex - 1];
      currentValues[optionIndex - 1] = temp;
      update(variantIndex, {
        ...fields[variantIndex],
        values: currentValues,
      });
    }
  };

  const moveDown = (variantIndex: number, optionIndex: number) => {
    const currentValues = [...getValues(`variants.${variantIndex}.values`)];
    if (optionIndex < currentValues.length - 1) {
      const temp = currentValues[optionIndex];
      currentValues[optionIndex] = currentValues[optionIndex + 1];
      currentValues[optionIndex + 1] = temp;
      update(variantIndex, {
        ...fields[variantIndex],
        values: currentValues,
      });
    }
  };

  return (
    <div className="flex flex-col border rounded-lg p-4 gap-y-2">
      <h3>Варіанти товару</h3>
      <div className="flex flex-col border rounded-md">
        {fields.map((field, index) => (
          <div key={`variant-${index}`} className="border-b">
            {isEditing.includes(index) ? (
              <div className="p-4 flex flex-col gap-y-4">
                <InputField
                  name={`variants.${index}.name`}
                  schema={productSchema}
                  form={form}
                  label="Назва варіанту"
                  placeholder="Наприклад: Колір"
                />
                <div className="flex flex-col gap-y-2 pl-6">
                  <h4 className="text-sm">Опції варіанту</h4>
                  <div className="flex flex-col gap-y-1">
                    {field.values.map((value, valueIndex) => (
                      <motion.div
                        key={value.id}
                        className="relative group flex items-center w-full"
                        layout
                      >
                        <InputField
                          name={`variants.${index}.values.${valueIndex}.name`}
                          schema={productSchema}
                          form={form}
                          label=""
                          placeholder="Опція"
                          className="space-y-0 w-full"
                        />
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center gap-x-1">
                          <Button
                            type="button"
                            onClick={() => moveUp(index, valueIndex)}
                            disabled={valueIndex === 0}
                            variant="icon"
                            size={"noSpace"}
                            className="p-1"
                          >
                            <ChevronUpIcon size={24} />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => moveDown(index, valueIndex)}
                            disabled={valueIndex === field.values.length - 1}
                            variant="icon"
                            size={"noSpace"}
                            className="p-1"
                          >
                            <ChevronDownIcon size={24} />
                          </Button>
                          <Button
                            type="button"
                            onClick={() =>
                              handleRemoveOption(index, valueIndex)
                            }
                            variant="icon"
                            size="icon"
                          >
                            <Trash2Icon size={24} />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <AlertDialog
                    label="Ви впевнені, що хочете видалити варіант?"
                    content="Це видалить всі опції цього варіанту."
                    buttonLabel="Видалити"
                    onSure={() => remove(index)}
                    buttonVariant="delete"
                  >
                    <Button type="button" variant="delete" size="xs">
                      Видалити варіант
                    </Button>
                  </AlertDialog>
                  <Button
                    type="button"
                    onClick={() => handleSave(index)}
                    size="xs"
                  >
                    Зберегти
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => toggleEditing(index)}
                className="p-4 cursor-pointer hover:bg-gray-100"
              >
                <h4>{field.name}</h4>
                <div className="flex gap-x-2">
                  {field.values.map((value, valueIndex) => (
                    <OptionsTag
                      label={value.name}
                      key={`variant-${index}-value-${valueIndex}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            append({
              name: "",
              values: [
                {
                  id: uuid(),
                  name: "",
                  value: "",
                  slug: "",
                },
              ],
            })
          }
          variant="icon"
          size="sm"
          className="justify-start w-full"
        >
          <CirclePlusIcon size={24} /> Додати варіант
        </Button>
      </div>
    </div>
  );
};

export default VariantsOptionsField;
