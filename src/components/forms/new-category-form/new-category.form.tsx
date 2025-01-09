"use client";

import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import {
  categorySchema,
  defaultCategoryValues,
} from "@/lib/schemas/category.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadThing } from "@/utils/uploadthing";
import UniversalField from "@/components/fields/universal.field";

const NewCategoryForm = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultCategoryValues,
  });

  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmitCategory(values: z.infer<typeof categorySchema>) {
    let imageUrl = "";

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages || !uploadedImages.length) {
        toast.error("Помилка завантаження зображень");
        return;
      }

      // Використовуємо URL першого завантаженого зображення
      imageUrl = uploadedImages[0].url;
    }

    const category = {
      ...values,
      image: imageUrl, // Якщо файлів не було, image буде пустим рядком
    };

    try {
      const res = await fetch("/api/categories/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      if (res.ok) {
        toast.success("Категорія створена успішно");
        onOpenChange();
      } else {
        const error = await res.json();
        console.error("Помилка:", error);
      }
    } catch (error) {
      console.error("Щось пішло не так:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          id="newCategoryForm"
          className="space-y-8"
          onSubmit={form.handleSubmit(onSubmitCategory)}
        >
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
            setFiles={setFiles}
          />

          <Button type="submit" form="newCategoryForm">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default NewCategoryForm;
