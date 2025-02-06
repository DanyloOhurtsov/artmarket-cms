"use client";

import { MAX_FILE_SIZE_2 } from "@/lib/constants/max-file-size";
import { ProductDefaultValues } from "@/lib/schemas/default-values/product.default-values";
import { ImageType } from "@/lib/schemas/new/image.schema";
import { productSchema, ProductType } from "@/lib/schemas/new/product.schema";
import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { Form } from "../ui/form";
import InputField from "../fields/input.field";
import { Separator } from "../ui/separator";
import TextareaField from "../fields/textarea.field";

interface ProductFormProps {
  initialValues?: ProductType;
  redirectPathAfterCreate?: string;
  setisFormDirty?: (isDirty: boolean) => void;
}
const ProductForm = ({
  initialValues,
  redirectPathAfterCreate = "/dashboard/products",
  setisFormDirty,
}: ProductFormProps) => {
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues ? initialValues : ProductDefaultValues,
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues]);

  const [images, setImages] = useState<(string | File)[]>(
    initialValues?.images ? initialValues.images.map((image) => image.url) : []
  );

  useEffect(() => {
    if (setisFormDirty) setisFormDirty(form.formState.isDirty);
  }, [form.formState.isDirty, setisFormDirty]);

  useEffect(() => {
    if (initialValues?.images) {
      setImages(initialValues.images.map((image) => image.url));
    }
  }, [initialValues]);

  async function handleSubmit(values: ProductType) {
    let imagesUrl: string[] | undefined;

    if (images.some((image) => image instanceof File)) {
      const files = images.filter(
        (image): image is File => image instanceof File
      );

      files.some((file) => {
        if (file.size > MAX_FILE_SIZE_2) {
          toast.error("Файл занадто великий");
          return;
        }
      });

      const uploadedImages = await startUpload(files);

      if (!uploadedImages || !uploadedImages.length) {
        toast.error("Помилка завантаження зображень");
        return;
      }

      imagesUrl = uploadedImages.map((image) => image.url);
    } else {
      imagesUrl = images as string[];
    }

    const imagesToProduct: ImageType[] = imagesUrl.map((url) => ({
      id: `image-${uuid()}`,
      url,
      productId: values.id,
    }));

    const productData: ProductType = {
      ...values,
      images: imagesToProduct,
    };

    const endpoint = initialValues
      ? `/api/products/${initialValues.id}`
      : "/api/products/new";
    const method = initialValues ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(`Помилка збереження товару, ${error.error}`);
        return;
      }

      toast.success("Товар успішно збережено");
      router.replace(redirectPathAfterCreate);
    } catch (error) {
      toast.error("Помилка при збереженні товару");
      console.error("Помилка при збереженні товару:", error);
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          id="productForm"
          onSubmit={(e) => {
            form.handleSubmit(handleSubmit)(e);
          }}
        >
          <div className="flex w-full gap-x-2">
            <div className="flex flex-col gap-y-6 w-3/4">
              <InputField
                form={form}
                name="title"
                label="Назва"
                placeholder="Наприклад: Олівці Faber-Castell"
                schema={productSchema}
                maxLength={200}
              />
              <InputField
                form={form}
                name="handle"
                label="Handle"
                placeholder="Наприклад: olivtsi-faber-castell"
                featuredField
                schema={productSchema}
                showDescription
                description="Назва товару у латинській транслітерації через дефіс (утворюється автоматично)"
              />
              <InputField
                form={form}
                name="vendor"
                label="Виробник"
                placeholder="Наприклад: Faber-Castell"
                schema={productSchema}
                maxLength={200}
              />

              <Separator />

              <TextareaField
                name="shortDescription"
                label="Короткий опис"
                placeholder="Наприклад: Високоякісні кольорові олівці Faber-Castell"
                showDescription
                description="Короткий опис товару, який буде відображатися на сторінці товару"
                schema={productSchema}
              />
              <TextareaField
                name="description"
                label="Повний опис"
                placeholder="Наприклад: Олівці Faber-Castell – якість, перевірена часом. Високоякісні кольорові олівці Faber-Castell забезпечують яскраві, насичені відтінки та плавне нанесення кольору. Міцний грифель стійкий до зламу, а деревина з екологічно чистих лісів гарантує безпечне використання. Ідеальні для навчання, творчості та професійних ілюстрацій."
                showDescription
                description="Повний опис товару, який буде відображатися на сторінці товару"
                schema={productSchema}
              />
            </div>

            <div className="flex flex-col gap-y-6 w-1/4 bg-red-50 sticky top-28 h-[calc(100vh-10rem)]"></div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
