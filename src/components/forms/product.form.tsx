"use client";

import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductDefaultValues } from "@/lib/schemas/default-values/product.default-values";
import { productSchema, ProductType } from "@/lib/schemas/new/product.schema";

import { Form } from "../ui/form";
import { Separator } from "../ui/separator";
import InputField from "../fields/input.field";
import TextareaField from "../fields/textarea.field";
import SelectField from "../fields/select.field";
import { CollectionType } from "@/lib/schemas/new/collection.schema";
import useSWR from "swr";
import { fetcher } from "@/lib/functions/fetcher";
import { VariantType } from "@/lib/schemas/new/variant.schema";

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
  const { data } = useSWR("/api/collections", fetcher);

  const { startUpload } = useUploadThing("imageUploader");
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues || ProductDefaultValues,
  });

  const [images, setImages] = useState<(string | File)[]>(
    initialValues?.images ? initialValues.images.map((image) => image.url) : []
  );

  const [selectedCollections, setSelectedCollections] = useState<
    CollectionType[]
  >(initialValues?.collections || []);

  const [variants, setVariants] = useState<VariantType[]>(
    initialValues?.variants || [
      {
        id: uuid(),
        title: "Default Variant",
        price: 0,
        availableForSale: true,
        quantityAvailable: 0,
      },
    ]
  );

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }

    if (initialValues?.images) {
      setImages(initialValues.images.map((image) => image.url));
    }
  }, [initialValues]);

  useEffect(() => {
    if (setisFormDirty) setisFormDirty(form.formState.isDirty);
  }, [form.formState.isDirty, setisFormDirty]);

  useEffect(() => {
    if (variants.length > 0) {
      const prices = variants.map((variant) => variant.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      form.setValue("minPrice", minPrice);
      form.setValue("maxPrice", maxPrice);
    }
  }, [variants, form]);

  const handleImageUpload = async () => {
    const files = images.filter((img): img is File => img instanceof File);
    if (files.length === 0) return [];

    const uploadResults = await startUpload(files);
    return (
      uploadResults?.map((result) => ({
        id: uuid(),
        url: result.url,
        productId: "",
      })) || []
    );
  };

  async function handleSubmit(values: ProductType) {
    try {
      // Завантаження зображень
      const uploadedImages = await handleImageUpload();

      // Підготовка даних для відправки
      const productData = {
        ...values,
        id: values.id || `product-${uuid()}`,
        images: uploadedImages,
        variants,
        featuredImageId: uploadedImages[0]?.id || null, // Приклад - перше зображення як featured
        collections: selectedCollections,
      };

      console.log(productData);

      // Відправка даних на сервер

      const response = await fetch("/api/products/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Помилка збереження");

      toast.success("Товар успішно створено");
      router.push(redirectPathAfterCreate);
    } catch (error) {
      toast.error("Помилка при збереженні товару");
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          id="productForm"
          onSubmit={(e) => {
            console.log("ksjdfbgv;");
            console.log(form.formState);
            form.handleSubmit(handleSubmit)(e);
          }}
        >
          <div className="flex w-full gap-x-4">
            <div className="flex flex-col gap-y-6 w-3/4 p-4 pr-0 h-[2000px]">
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
              <div className="border border-gray-200 rounded-lg p-4 h-full">
                <InputField
                  form={form}
                  name="vendor"
                  label="Виробник"
                  placeholder="Наприклад: Faber-Castell"
                  schema={productSchema}
                  maxLength={200}
                />

                <SelectField
                  name="collections"
                  placeholder="Оберіть колекцію"
                  initialOptions={data} // Ваші дані про колекції
                  selectedOptions={selectedCollections}
                  setSelectedOptions={setSelectedCollections}
                  isMulti
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
