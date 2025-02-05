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
          className="space-y-6"
          onSubmit={(e) => {
            form.handleSubmit(handleSubmit)(e);
          }}
        >

        </form>
      </Form>
    </>
  );
};

export default ProductForm;
