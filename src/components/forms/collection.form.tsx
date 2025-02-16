"use client";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  collectionSchema,
  CollectionType,
} from "@/lib/schemas/new/collection.schema";
import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageType } from "@/lib/schemas/new/image.schema";
import { MAX_FILE_SIZE_2 } from "@/lib/constants/max-file-size";
import { ImageDefaultValues } from "@/lib/schemas/default-values/image.default-values";
import { collectionDefaultValues } from "@/lib/schemas/default-values/collection.default-values";

import { Form } from "../ui/form";
import { Separator } from "../ui/separator";
import InputField from "../fields/input.field";
import TextareaField from "../fields/textarea.field";
import ImageInputField from "../fields/image-input.field";

interface CollectionFormProps {
  initialValues?: CollectionType;
  redirectPathAfterCreate?: string;
  setIsFormDirty?: (isDirty: boolean) => void;
}

const CollectionForm = ({
  initialValues,
  redirectPathAfterCreate = "/dashboard",
  setIsFormDirty,
}: CollectionFormProps) => {
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const form = useForm<CollectionType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: initialValues ? initialValues : collectionDefaultValues,
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues]);

  const [image, setImage] = useState<(string | File)[]>(
    initialValues?.image ? [initialValues.image.url] : []
  );

  useEffect(() => {
    if (setIsFormDirty) setIsFormDirty(form.formState.isDirty);
  }, [form.formState.isDirty, setIsFormDirty]);

  useEffect(() => {
    if (initialValues?.image?.url) {
      setImage([initialValues.image.url]);
    }
  }, [initialValues?.image?.url]);

  async function handleSubmit(values: CollectionType) {
    let imageUrl: string | undefined;

    // Image upload
    if (image.some((image) => image instanceof File)) {
      const files = image.filter(
        (image): image is File => image instanceof File
      );

      files.some((file) => {
        if (file.size > MAX_FILE_SIZE_2) {
          toast.error("Розмір файлу перевищує 2MB");
          return;
        }
      });

      const uploadedImages = await startUpload(files);

      if (!uploadedImages || !uploadedImages.length) {
        toast.error("Помилка завантаження зображень");
        return;
      }

      imageUrl = uploadedImages[0].url;
    } else {
      imageUrl = image[0] as string;
    }

    const imageToCollection: ImageType = {
      ...ImageDefaultValues,
      url: imageUrl,
      collection: values,
    };

    // Save collection
    const collection = { ...values, image: imageToCollection };

    const endpoint = initialValues
      ? `/api/collections/${initialValues.handle}`
      : "/api/collections/new";
    const method = initialValues ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collection),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(`Помилка збереження категорії, ${error.error}`);
        console.error("Помилка:", error);
        return;
      }

      toast.success("Колекція успішно збережена");
      router.push(redirectPathAfterCreate);
    } catch (error) {
      toast.error("Щось пішло не так");
      console.error("Щось пішло не так:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          id="collectionForm"
          className="space-y-6"
          onSubmit={(e) => {
            console.log(form.formState.errors);
            form.handleSubmit(handleSubmit)(e);
          }}
        >
          <InputField
            form={form}
            name="title"
            label="Назва категорії"
            placeholder="Наприклад: Офісні товари"
            schema={collectionSchema}
            maxLength={100}
          />

          <InputField
            form={form}
            name="handle"
            label="Handle"
            placeholder="Наприклад: office-supplies"
            featuredField
            schema={collectionSchema}
            showDescription
            description="Назва категорії у латинській транслітерації через дефіс (утворюється автоматично)"
          />

          <TextareaField
            name="description"
            label="Повний опис"
            placeholder="Наприклад: В асортименті є все для офісу"
            description="Повний опис категорії, який буде відображатися на сторінці категорії"
            showDescription
            schema={collectionSchema}
          />

          <Separator />

          <ImageInputField
            type="file"
            name="image"
            schema={collectionSchema}
            label="Посилання на зображення"
            placeholder="https://example.com/image.jpg"
            description="Посилання на зображення категорії, яке буде відображатися на сторінці категорії"
            showDescription
            maxLength={1}
            files={image}
            setFiles={setImage}
          />
        </form>
      </Form>
    </>
  );
};

export default CollectionForm;
