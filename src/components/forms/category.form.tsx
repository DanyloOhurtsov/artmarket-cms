"use client";

import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import {
  categorySchemaTest,
  CategoryType,
} from "@/lib/schemas/category.schema";
import { useUploadThing } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import { Form } from "../ui/form";
import toast from "react-hot-toast";
import InputField from "../fields/input.field";
import TextareaField from "../fields/textarea.field";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ImageInputField from "../fields/image-input.field";

interface CategoryFormProps {
  form: UseFormReturn<z.infer<typeof categorySchemaTest>>;
  onOpenChange?: () => void;
  onCategorySaved: (newCategory: CategoryType) => void;
  initialData?: CategoryType;
}

const CategoryForm = ({
  form,
  onOpenChange,
  onCategorySaved,
  initialData,
}: CategoryFormProps) => {
  const { startUpload } = useUploadThing("imageUploader");
  const [images, setImages] = useState<(string | File)[]>(
    initialData?.image ? [initialData.image] : []
  );

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        slug: initialData.slug,
        shortDesc: initialData.shortDesc,
        description: initialData.description,
        image: initialData.image,
      });
    }
  }, [initialData, form]);

  async function handleSubmit(values: z.infer<typeof categorySchemaTest>) {
    let imageUrl = images[0];

    if (images.some((image) => image instanceof File)) {
      const files = images.filter(
        (image): image is File => image instanceof File
      );
      const uploadedImages = await startUpload(files);

      if (!uploadedImages || !uploadedImages.length) {
        toast.error("Помилка завантаження зображень");
        return;
      }
      imageUrl = uploadedImages[0].url;
    }

    const category = { ...values, image: imageUrl };
    const endpoint = initialData
      ? `/api/categories/${initialData.id}`
      : "/api/categories/new";
    const method = initialData ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      if (res.ok) {
        const savedCategory = await res.json();
        toast.success(
          initialData
            ? "Категорія оновлена успішно"
            : "Категорія створена успішно"
        );
        onCategorySaved(savedCategory);

        if (onOpenChange) onOpenChange();
      } else {
        const error = await res.json();
        toast.error("Помилка збереження категорії");
        console.error("Помилка:", error);
      }
    } catch (error) {
      toast.error("Щось пішло не так");
      console.error("Щось пішло не так:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          id="categoryForm"
          className="space-y-6"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <InputField
            form={form}
            name="name"
            label="Назва категорії"
            placeholder="Наприклад: Офісні товари"
            schema={categorySchemaTest}
            maxLength={100}
          />
          <InputField
            form={form}
            name="slug"
            label="Slug"
            placeholder="Наприклад: office-supplies"
            featuredField
            schema={categorySchemaTest}
            showDescription
            description="Назва категорії у латинській транслітерації через дефіс (утворюється автоматично)"
          />

          <TextareaField
            name="shortDesc"
            label="Короткий опис"
            placeholder="Наприклад: Все для офісу"
            schema={categorySchemaTest}
            maxLength={250}
          />
          <TextareaField
            name="description"
            label="Повний опис"
            placeholder="Наприклад: В асортименті є все для офісу"
            description="Повний опис категорії, який буде відображатися на сторінці категорії"
            showDescription
            schema={categorySchemaTest}
          />

          <Separator />

          <ImageInputField
            schema={categorySchemaTest}
            name="image"
            label="Посилання на зображення"
            placeholder="https://example.com/image.jpg"
            description="Посилання на зображення категорії, яке буде відображатися на сторінці категорії"
            showDescription
            maxLength={1}
            files={images}
            setFiles={setImages}
            type="file"
          />

          <Button type="submit" form="categoryForm">
            {initialData ? "Оновити категорію" : "Створити категорію"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
