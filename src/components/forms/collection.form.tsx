"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  collectionSchema,
  CollectionType,
} from "@/lib/schemas/new/collection.schema";
import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageType } from "@/lib/schemas/new/image.schema";
import { collectionDefaultValues } from "@/lib/schemas/default-values/collection.default-values";
import { Form } from "../ui/form";
import InputField from "../fields/input.field";
import TextareaField from "../fields/textarea.field";
import { Separator } from "../ui/separator";
import ImageInputField from "../fields/image-input.field";
import { Button } from "../ui/button";

interface CollectionFormProps {
  initialValues?: CollectionType;
  redirectPathAfterCreate?: string;
}

const CollectionForm = ({
  initialValues,
  redirectPathAfterCreate = "/dashboard",
}: CollectionFormProps) => {
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const form = useForm<CollectionType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: initialValues ? initialValues : collectionDefaultValues,
  });

  const [image, setImage] = useState<(string | File)[]>(
    initialValues?.image ? [initialValues.image.url] : []
  );

  // useEffect(() => {
  //   if(initialValues) {
  //     form.reset
  //   }
  // }, [initialValues])

  async function handleSubmit(values: CollectionType) {
    let imageUrl: string | undefined;

    // Image upload
    if (image.some((image) => image instanceof File)) {
      const files = image.filter(
        (image): image is File => image instanceof File
      );

      console.log("Files",files);

      const uploadedImages = await startUpload(files);

      console.log("Upl",uploadedImages);

      if (!uploadedImages || !uploadedImages.length) {
        toast.error("Помилка завантаження зображень");
        return;
      }

      imageUrl = uploadedImages[0].url;
    } else {
      imageUrl = image[0] as string;
    }

    const imageToCollection: ImageType = {
      id: `image-${uuid()}`,
      url: imageUrl,
      collection: values,
    };

    // Save collection
    const collection = { ...values, image: imageToCollection };

    const endpoint = initialValues
      ? `/api/collections/${initialValues.id}`
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
        toast.error("Помилка збереження категорії");
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
          onSubmit={form.handleSubmit(handleSubmit)}
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

          <Button type="submit" form="collectionForm">
            {initialValues ? "Оновити колекцію" : "Створити колекцію"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CollectionForm;
