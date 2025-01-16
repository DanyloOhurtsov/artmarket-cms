"use client";

import { z } from "zod";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { memo, useState } from "react";
import { v4 as uuid } from "uuid";

import { Button } from "@/components/ui/button";
import InputField from "@/components/fields/input.field";
import { productSchema } from "@/lib/schemas/product.schema";

type ProductFormType = z.infer<typeof productSchema>;

interface VariantFieldProps {
  name: "variants";
  form: UseFormReturn<ProductFormType>;
}

const VariantField = ({ name, form }: VariantFieldProps) => {
  const { control, trigger } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const saveVariant = async () => {
    await trigger(name);
    setIsEditing(null);
  };

  return (
    <div>
      <h3 className="font-bold text-lg">Варіанти</h3>
      {fields.map((field, index) => (
        <div key={index} className="border p-4 rounded mb-4">
          {isEditing === index ? (
            <div>
              {/* Режим редагування */}
              <InputField
                form={form}
                schema={productSchema}
                name={`${name}.${index}.name`}
                label="Назва варіанту"
                placeholder="Наприклад: Колір"
              />
              <h4 className="font-semibold mt-2">Значення</h4>
              <VariantValueField
                name={`${name}.${index}.values`}
                form={form}
                index={index}
                removeVariant={() => remove(index)}
              />
              <Button
                type="button"
                onClick={saveVariant}
                className="bg-green-500 mt-2"
              >
                Зберегти
              </Button>
              <Button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 mt-2"
              >
                Видалити варіант
              </Button>
            </div>
          ) : (
            <div>
              {/* Режим перегляду */}
              <div className="flex justify-between items-center">
                <p className="font-bold">{field.name}</p>
                <Button
                  type="button"
                  onClick={() => setIsEditing(index)}
                  className="bg-blue-500"
                >
                  Редагувати
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                {field.values.map((value: any) => (
                  <span
                    key={value.id}
                    className="bg-gray-200 text-gray-700 p-2 rounded"
                  >
                    {value.name}
                  </span>
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
            values: [{ id: uuid(), name: "", value: "", slug: "" }],
          })
        }
      >
        Додати варіант
      </Button>
    </div>
  );
};

const VariantValueField = ({
  form,
  name,
  index,
  removeVariant,
}: {
  form: UseFormReturn<ProductFormType>;
  name: string;
  index: number;
  removeVariant: () => void;
}) => {
  const { control, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      {fields.map((field, valueIndex) => (
        <div key={valueIndex} className="flex items-center gap-4 mt-2">
          <InputField
            name={`${name}.${valueIndex}.name`}
            label="Назва"
            placeholder="Наприклад: Червоний"
            schema={productSchema}
            form={form}
          />
          <InputField
            name={`${name}.${valueIndex}.value`}
            label="Значення"
            placeholder="Наприклад: red"
            schema={productSchema}
            form={form}
          />
          <InputField
            name={`${name}.${valueIndex}.slug`}
            label="Slug"
            placeholder="Наприклад: red"
            schema={productSchema}
            form={form}
          />
          <Button type="button" onClick={() => remove(valueIndex)}>
            Видалити значення
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ id: uuid(), name: "", value: "", slug: "" })}
      >
        Додати значення
      </Button>
      {index > 0 && (
        <Button
          type="button"
          onClick={removeVariant}
          className="bg-red-500 mt-4"
        >
          Видалити варіант
        </Button>
      )}
    </div>
  );
};

export default memo(VariantField);
