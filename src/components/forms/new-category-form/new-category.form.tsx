"use client";

import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import {
  categorySchema,
  CategoryType,
  defaultCategoryValues,
} from "@/lib/schemas/category.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/utils/uploadthing";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/fields/input.field";
import TextareaField from "@/components/fields/textarea.field";
import ImageInputField from "@/components/fields/image-input.field";

const NewCategoryForm = ({
  onOpenChange,
  onCategoryCreated,
}: {
  onOpenChange: () => void;
  onCategoryCreated: (newCategory: CategoryType) => void;
}) => {
  const { startUpload } = useUploadThing("imageUploader");
  const [images, setImages] = useState<(string | File)[]>([]);
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultCategoryValues,
  });

  async function onSubmitCategory(values: z.infer<typeof categorySchema>) {
    let imageUrl = images[0];

    if (uploadMethod === "file") {
      const files = images.filter(
        (image): image is File => image instanceof File
      );

      if (images.length > 0) {
        const uploadedImages = await startUpload(files);

        if (!uploadedImages || !uploadedImages.length) {
          toast.error("Помилка завантаження зображень");
          return;
        }

        imageUrl = uploadedImages[0].url;
      }
    }

    const category = {
      ...values,
      image: imageUrl,
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
        const newCategory = await res.json();

        toast.success("Категорія створена успішно");
        onCategoryCreated(newCategory);

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
          <InputField
            form={form}
            name="name"
            label="Назва категорії"
            placeholder="Наприклад: Офісні товари"
            schema={categorySchema}
            maxLength={100}
          />
          <InputField
            form={form}
            name="slug"
            label="Slug"
            placeholder="Наприклад: office-supplies"
            featuredField
            schema={categorySchema}
            showDescription
            description="Назва категорії у латинській транслітерації через дефіс (утворюється автоматично)"
          />

          <TextareaField
            name="shortDesc"
            label="Короткий опис"
            placeholder="Наприклад: Все для офісу"
            schema={categorySchema}
            maxLength={250}
          />
          <TextareaField
            name="description"
            label="Повний опис"
            placeholder="Наприклад: В асортименті є все для офісу"
            description="Повний опис категорії, який буде відображатися на сторінці категорії"
            showDescription
            schema={categorySchema}
          />

          <Separator />
          <div className="flex flex-col space-y-4">
            <div className="flex items-center border rounded-full w-fit border-primary/40">
              <Button
                type="button"
                onClick={() => setUploadMethod("url")}
                variant={uploadMethod === "file" ? "ghost" : "default"}
                className="rounded-full min-w-20"
                // TODO: Remove disabled attribute
                disabled
              >
                Url
              </Button>
              <Button
                type="button"
                onClick={() => setUploadMethod("file")}
                variant={uploadMethod === "file" ? "default" : "ghost"}
                className="rounded-full min-w-20"
                // TODO: Remove disabled attribute
                disabled
              >
                File
              </Button>
            </div>
            <ImageInputField
              schema={categorySchema}
              name="image"
              label="Посилання на зображення"
              placeholder="https://example.com/image.jpg"
              description="Посилання на зображення категорії, яке буде відображатися на сторінці категорії"
              showDescription
              maxLength={1}
              files={images}
              setFiles={setImages}
              type={uploadMethod}
            />
          </div>

          <Button type="submit" form="newCategoryForm">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default NewCategoryForm;
