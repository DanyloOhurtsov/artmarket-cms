import { productSchema } from "@/lib/schemas/product.schema";
import React, { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { v4 as uuid } from "uuid";
import InputField from "../input.field";
import OptionsTag from "./components/options.tag";
import { CirclePlusIcon } from "lucide-react";
import OptionsField from "./components/options.filed";

interface VariantsOptionsFieldProps {
  form: UseFormReturn<z.infer<typeof productSchema>>;
}

const VariantsOptionsField = ({ form }: VariantsOptionsFieldProps) => {
  const { control } = form;
  const [isEditing, setIsEditing] = useState<number[]>([0]);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variants",
  });
  console.log(fields);
  const toggleEditing = (index: number) => {
    setIsEditing((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleClick = () => {
    append({
      name: "bill",
      values: [
        {
          id: uuid(),
          name: "",
          value: "",
          slug: "",
        },
      ], // Масив з одним об'єктом
    });
  };

  const handleSave = (index: number) => {
    const variantName = form.getValues(`variants.${index}.name`);
    update(index, { ...fields[index], name: variantName });
    setIsEditing((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div className="flex flex-col border rounded-lg p-4 gap-y-2">
      <div className="">
        <h3>Варіанти товару</h3>
      </div>
      <div className="flex flex-col border rounded-md">
        {fields.map((field, index) => (
          <div key={`variant-${index}`} className="border-b">
            {isEditing.includes(index) ? (
              <div className="p-4 flex flex-col gap-y-4">
                <div className="flex flex-col">
                  <p className="text-sm">Назва варіанту</p>
                  <InputField
                    name={`variants.${index}.name`}
                    schema={productSchema}
                    form={form}
                    label=""
                    placeholder="Наприклад: Колір"
                  />
                </div>

                <div className="">
                  <p className="text-sm">Опції варіанту:</p>
                  {field.values.map((value, valueIndex) => {
                    return (
                      <OptionsField
                        name={`variants.${index}.values.${valueIndex}`}
                        form={form}
                        variantIndex={index}
                        key={`variant-${index}-value-${valueIndex}-editing`}
                        removeVariant={() => remove(index)}
                        value={value}
                      />
                    );
                  })}
                </div>

                <div>
                  <Button type="button" onClick={() => remove(index)}>
                    Видалити варіант
                  </Button>

                  <Button type="button" onClick={() => handleSave(index)}>
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
        <div className="w-full">
          <Button
            type="button"
            onClick={handleClick}
            variant={"icon"}
            size={"sm"}
            className="justify-start w-full"
          >
            <CirclePlusIcon size={24} />
            <p>Додати варіант</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VariantsOptionsField;
