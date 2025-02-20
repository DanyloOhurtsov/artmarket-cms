"use client";

import useSWR from "swr";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/functions/fetcher";
import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageType } from "@/lib/schemas/new/image.schema";
import { formatPrice } from "@/lib/functions/format-price";
import { VariantType } from "@/lib/schemas/new/variant.schema";
import { MAX_FILE_SIZE_2 } from "@/lib/constants/max-file-size";
import { productSchema, ProductType } from "@/lib/schemas/new/product.schema";
import { ImageDefaultValues } from "@/lib/schemas/default-values/image.default-values";
import { VariantDefaultValues } from "@/lib/schemas/default-values/variant.default-values";
import { ProductDefaultValues } from "@/lib/schemas/default-values/product.default-values";

import { Form } from "../ui/form";
import { Separator } from "../ui/separator";
import InputField from "../fields/input.field";
import SelectField from "../fields/select.field";
import SwitchField from "../fields/switch.field";
import TextareaField from "../fields/textarea.field";

interface ProductFormProps {
  initialValues?: ProductType;
  redirectPathAfterCreate?: string;
  setIsFormDirty?: (isDirty: boolean) => void;
}
const ProductForm = ({
  initialValues,
  redirectPathAfterCreate = "/dashboard/products",
  setIsFormDirty,
}: ProductFormProps) => {
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues ? initialValues : ProductDefaultValues,
  });
  const { data: collectionsData } = useSWR("/api/collections", fetcher);

  const variants = useWatch({
    control: form.control,
    name: "variants",
    defaultValue: [VariantDefaultValues],
  });

  const computedPrices = variants?.map(
    (variant: VariantType) => variant.price || 0
  );
  const computedMinPrice = computedPrices?.length
    ? Math.min(...computedPrices)
    : 0;
  const computedMaxPrice = computedPrices?.length
    ? Math.max(...computedPrices)
    : 0;

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  const [images, setImages] = useState<(string | File)[]>(
    initialValues?.images ? initialValues.images.map((image) => image.url) : []
  );

  useEffect(() => {
    if (setIsFormDirty) setIsFormDirty(form.formState.isDirty);
  }, [form.formState.isDirty, setIsFormDirty]);

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
      ...ImageDefaultValues,
      url,
      productId: values.id,
    }));

    const productData: ProductType = {
      ...ProductDefaultValues,
      ...values,
      minPrice: computedMinPrice,
      maxPrice: computedMaxPrice,
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
          <div className="flex w-full gap-x-4">
            <div className="flex flex-col gap-y-6 w-3/4 p-4 pr-0">
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

            <div className="w-1/4 sticky top-28 right-0 h-[calc(100vh-7rem)] p-4 pl-0">
              <div className="border border-gray-200 rounded-lg p-4 h-full flex flex-col gap-y-4">
                <SwitchField
                  name="availableForSale"
                  label="Доступний для продажу"
                  placeholder={
                    form.watch("availableForSale") ? "Активний" : "Чернетка"
                  }
                />

                <Separator />

                <InputField
                  form={form}
                  name="vendor"
                  label="Виробник"
                  placeholder="Наприклад: Faber-Castell"
                  schema={productSchema}
                  maxLength={200}
                />

                {collectionsData && (
                  <SelectField
                    name="collections"
                    placeholder="Оберіть колекцію"
                    initialOptions={collectionsData}
                  />
                )}

                <Separator />
                <div className="flex flex-col gap-y-2">
                  <h2>Ціни на товар</h2>
                  {computedMaxPrice === computedMinPrice ? (
                    <div className="flex w-full">
                      <p className="font-medium w-1/3 border-r border-gray-200 pl-1">
                        Ціна
                      </p>
                      <p className="font-light w-2/3 pl-1">
                        {formatPrice(computedMinPrice)}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col w-full">
                      {[
                        {
                          label: "Від",
                          value: computedMinPrice,
                        },
                        {
                          label: "До",
                          value: computedMaxPrice,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={cn(
                            "w-full flex",
                            index !== 0 ? "border-t border-gray-200" : ""
                          )}
                        >
                          <p className="w-1/3 min-w-5 border-r border-gray-200 pl-1 font-medium">
                            {item.label}
                          </p>
                          <p className="w-2/3 pl-1 font-light">
                            {formatPrice(item.value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
