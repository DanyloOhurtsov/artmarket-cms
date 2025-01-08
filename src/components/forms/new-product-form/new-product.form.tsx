"use client";

import { z } from "zod";
import { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { PrismaClient } from "@prisma/client";

import {
  defaultProductValues,
  productSchema,
} from "@/lib/schemas/product.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import UniversalField from "@/components/fields/universal.field";

const NewProductForm = () => {
  const memoizedDefaultValues = useMemo(() => defaultProductValues, []);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: memoizedDefaultValues,
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Помилка завантаження категорій");
        }
        const data = await response.json();

        setCategoryOptions(data);
      } catch (err) {
        console.error("Помилка завантаження категорій:", err);
      }
    }

    fetchCategories();
  }, []);

  function onSubmit(values: z.infer<typeof productSchema>) {
    console.log("Форма успішно пройшла перевірку!", values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-x-6 w-full"
      >
        <div className="flex flex-col space-y-4 w-2/3">
          <UniversalField
            form={form}
            name="name"
            label="Назва товару"
            placeholder="Наприклад: Чорні олівці з коробкою"
            schema={productSchema}
          />
          <UniversalField
            form={form}
            name="slug"
            label="Slug"
            placeholder="Наприклад: black-pencils-with-case"
            featuredField={{
              generateSlug: true,
            }}
            description="Назва товару у латинській транслітерації через дефіс (утворюється автоматично)"
            showDescription
            schema={productSchema}
          />
          <UniversalField
            name="shortDesc"
            label="Короткий опис товару"
            placeholder="Наприклад: Чорні олівці, які поставляються в компактній коробці."
            form={form}
            type="textarea"
            minLength={3}
            maxLength={100}
            schema={productSchema}
          />
          <UniversalField
            name="description"
            label="Опис товару"
            placeholder="Наприклад: Ці чорні олівці виготовлені з високоякісної деревини. У комплекті йде стильна коробка, яка ідеально підходить для зберігання та транспортування."
            form={form}
            type="textarea"
            minLength={3}
            maxLength={1000}
            schema={productSchema}
          />
          <UniversalField
            form={form}
            name="price"
            label="Ціна"
            placeholder="Ціна товару"
            type="number"
            schema={productSchema}
          />

          <Button type="submit" onClick={() => onSubmit(form.getValues())}>
            Створити продукт
          </Button>
        </div>

        {/* Aside */}
        <div className="flex flex-col space-y-4 w-1/3 border rounded-xl p-5">
          <UniversalField
            form={form}
            name="isActive"
            label="Активний"
            placeholder="Чи активний цей товар?"
            type="checkbox"
            schema={productSchema}
          />
          <UniversalField
            form={form}
            name="stock"
            label="Кількість на складі"
            placeholder="На складі"
            type="number"
            showDescription
            description="Кількість одиниць товару, які є на складі"
            schema={productSchema}
          />
          <UniversalField
            form={form}
            name="minOrder"
            label="Мінімальне замовлення"
            placeholder="1"
            type="number"
            schema={productSchema}
          />
          <UniversalField
            form={form}
            name="maxOrder"
            label="Максимальне замовлення"
            placeholder="10"
            type="number"
            featuredField={{ resetField: true }}
            showDescription
            description="Максимальна кількість одиниць товару, яку можна замовиnти за один раз"
            schema={productSchema}
          />
          <UniversalField
            name="category"
            label="Категорія"
            placeholder="Оберіть категорію товару"
            form={form}
            type="select"
            options={categoryOptions}
            schema={productSchema}
          />
        </div>
      </form>
    </Form>
  );
};

export default memo(NewProductForm);
