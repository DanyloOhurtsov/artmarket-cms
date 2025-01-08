"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import {
  categorySchema,
  defaultCategoryValues,
} from "@/lib/schemas/category.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import UniversalField from "@/components/fields/universal.field";

const NewCategoryForm = () => {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultCategoryValues,
  });

  function onSubmit(values: z.infer<typeof categorySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <UniversalField
            form={form}
            name="name"
            label="Назва категорії"
            placeholder="Наприклад: Офісні товари"
            schema={categorySchema}
          />
          <UniversalField
            form={form}
            name="slug"
            label="Slug"
            placeholder="Наприклад: office-supplies"
            featuredField={{
              generateSlug: true,
            }}
            description="Назва категорії у латинській транслітерації через дефіс (утворюється автоматично)"
            showDescription
            schema={categorySchema}
          />
          <UniversalField
            form={form}
            type="textarea"
            name="shortDesc"
            label="Короткий опис"
            placeholder="Наприклад: Все для офісу"
            description="Короткий опис категорії, який буде відображатися на головній сторінці"
            showDescription
            schema={categorySchema}
          />
          <UniversalField
            form={form}
            type="textarea"
            name="description"
            label="Повний опис"
            placeholder="Наприклад: В асортименті є все для офісу"
            description="Повний опис категорії, який буде відображатися на сторінці категорії"
            showDescription
            schema={categorySchema}
          />
          <UniversalField
            form={form}
            type="upload"
            name="images"
            label="Зображення"
            placeholder="Завантажте зображення категорії"
            description="Зображення категорії, яке буде відображатися на сторінці категорії (max 1)"
            showDescription
            schema={categorySchema}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default NewCategoryForm;
