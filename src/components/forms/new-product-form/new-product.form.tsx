"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { memo, useEffect, useMemo, useState } from "react";

import {
  productSchema,
  defaultProductValues,
} from "@/lib/schemas/product.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/fields/input.field";
import NumberField from "@/components/fields/number.field";
import SwitchField from "@/components/fields/switch.field";
import SelectField from "@/components/fields/select.field";
import { CategoryType } from "@/lib/schemas/category.schema";
import TextareaField from "@/components/fields/textarea.field";

const NewProductForm = () => {
  const memoizedDefaultValues = useMemo(() => defaultProductValues, []);
  const [categoryOptions, setCategoryOptions] = useState<CategoryType[]>([]);

  const formProduct = useForm<z.infer<typeof productSchema>>({
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
    <Form {...formProduct}>
      <form
        id="newProductForm"
        onSubmit={formProduct.handleSubmit(onSubmit)}
        className="flex gap-x-6 w-full"
      >
        <div className="flex flex-col space-y-4 w-2/3">
          <InputField
            form={formProduct}
            name="name"
            label="Назва товару"
            placeholder="Наприклад: Чорні олівці з коробкою"
            schema={productSchema}
          />
          <InputField
            form={formProduct}
            name="slug"
            label="Slug"
            placeholder="Наприклад: black-pencils-with-case"
            featuredField
            description="Назва товару у латинській транслітерації через дефіс (утворюється автоматично)"
            showDescription
            schema={productSchema}
          />

          <TextareaField
            name="shortDesc"
            label="Короткий опис товару"
            placeholder="Наприклад: Чорні олівці, які поставляються в компактній коробці."
            description="Короткий опис товару, який буде відображатися на картці товару на сторінці каталогу"
            showDescription
            schema={productSchema}
            maxLength={250}
          />
          <TextareaField
            name="description"
            label="Опис товару"
            placeholder="Наприклад: Ці чорні олівці виготовлені з високоякісної деревини. У комплекті йде стильна коробка, яка ідеально підходить для зберігання та транспортування."
            schema={productSchema}
            description="Повний опис товару, який буде відображатися на сторінці товару"
            showDescription
          />

          <NumberField
            name="price"
            label="Ціна"
            placeholder="Ціна товару"
            schema={productSchema}
            description="Ціна товару в гривнях"
            showDescription
          />

          <Button type="submit" form="newProductForm">
            Створити продукт
          </Button>
        </div>

        {/* Aside */}
        <div className="flex flex-col space-y-4 w-1/3 border rounded-xl p-5">
          <SwitchField
            name="isActive"
            label="Активний"
            placeholder="Чи активний цей товар?"
          />
          <NumberField
            name="stock"
            label="Кількість на складі товару"
            placeholder="На складі"
            schema={productSchema}
          />
          <NumberField
            name="minOrder"
            label="Мінімальне замовлення"
            placeholder="1"
            schema={productSchema}
          />
          <NumberField
            name="maxOrder"
            label="Максимальне замовлення"
            placeholder="10"
            schema={productSchema}
            description="Максимальна кількість одиниць товару, яку можна замовиnти за один раз"
            showDescription
          />

          <SelectField
            name="category"
            placeholder="Оберіть категорію товару"
            initialOptions={categoryOptions}
          />
        </div>
      </form>
    </Form>
  );
};

export default memo(NewProductForm);
