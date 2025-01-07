"use client";

import { z } from "zod";
import { memo, useMemo } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <UniversalFormField
          form={form}
          name="name"
          label="Назва товару"
          placeholder="Наприклад: Чорні олівці з коробкою"
        />
        <UniversalFormField
          form={form}
          name="slug"
          label="Slug (Назва товару у латинській транслітерації через дефіс)"
          placeholder="Наприклад: black-pencils-with-case"
          featuredField={{
            generateSlug: true,
          }}
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
        <div className="flex gap-x-2">
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
            placeholder="Кількість одиниць товару на складі"
            type="number"
          />
        </div>
        <UniversalFormField
          form={form}
          name="price"
          label="Ціна"
          placeholder="Ціна товару"
          type="number"
        />
        <div className="flex gap-x-2">
          <UniversalFormField
            form={form}
            name="minOrder"
            label="Мінімальне замовлення"
            placeholder="Мінімальна кількість одиниць товару, яку можна замовити"
            type="number"
          />
          <UniversalFormField
            form={form}
            name="maxOrder"
            label="Максимальне замовлення"
            placeholder="Максимальна кількість одиниць товару, яку можна замовит"
            type="number"
            featuredField={{ resetField: true }}
          />
        </div>
        <UniversalFormField
          name="category"
          label="Категорія"
          placeholder="Оберіть категорію товару"
          form={form}
          type="select"
          options={[]}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default memo(NewProductForm);
