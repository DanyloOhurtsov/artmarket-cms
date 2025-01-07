"use client";

import { z } from "zod";
import { memo, useMemo } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import UniversalFormField from "./components/universal-form-field";
import { productSchema, defaultProductValues } from "./product.schema";

const NewProductForm = () => {
  const memoizedDefaultValues = useMemo(() => defaultProductValues, []);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: memoizedDefaultValues,
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-x-3 w-full"
      >
        <div className="flex flex-col space-y-4 w-2/3">
          <UniversalFormField
            form={form}
            name="name"
            label="Назва товару"
            placeholder="Наприклад: Чорні олівці з коробкою"
          />
          <UniversalFormField
            form={form}
            name="slug"
            label="Slug"
            placeholder="Наприклад: black-pencils-with-case"
            featuredField={{
              generateSlug: true,
            }}
            description="Назва товару у латинській транслітерації через дефіс (утворюється автоматично)"
            showDescription
          />
          <UniversalFormField
            name="shortDesc"
            label="Короткий опис товару"
            placeholder="Наприклад: Чорні олівці, які поставляються в компактній коробці."
            form={form}
            type="textarea"
            minLength={3}
            maxLength={100}
          />
          <UniversalFormField
            name="description"
            label="Опис товару"
            placeholder="Наприклад: Ці чорні олівці виготовлені з високоякісної деревини. У комплекті йде стильна коробка, яка ідеально підходить для зберігання та транспортування."
            form={form}
            type="textarea"
            minLength={3}
            maxLength={1000}
          />
          <UniversalFormField
            form={form}
            name="price"
            label="Ціна"
            placeholder="Ціна товару"
            type="number"
          />

          <Button type="submit">Submit</Button>
        </div>

        {/* Aside */}
        <div className="flex flex-col space-y-4 w-1/3">
          <UniversalFormField
            form={form}
            name="isActive"
            label="Активний"
            placeholder="Чи активний цей товар?"
            type="checkbox"
          />
          <UniversalFormField
            form={form}
            name="stock"
            label="Кількість на складі"
            placeholder="На складі"
            type="number"
            showDescription
            description="Кількість одиниць товару, які є на складі"
          />
          <UniversalFormField
            form={form}
            name="minOrder"
            label="Мінімальне замовлення"
            placeholder="1"
            type="number"
          />
          <UniversalFormField
            form={form}
            name="maxOrder"
            label="Максимальне замовлення"
            placeholder="10"
            type="number"
            featuredField={{ resetField: true }}
            showDescription
            description="Максимальна кількість одиниць товару, яку можна замовиnти за один раз"
          />
          <UniversalFormField
            name="category"
            label="Категорія"
            placeholder="Оберіть категорію товару"
            form={form}
            type="select"
            options={[]}
          />
        </div>
      </form>
    </Form>
  );
};

export default memo(NewProductForm);
