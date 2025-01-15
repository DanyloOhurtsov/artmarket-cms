"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import PageTitle from "@/components/page-title/page-title";
import { productSchema } from "@/lib/schemas/product.schema";
import { defaultProductValues } from "@/lib/schemas/default-values";
import NewProductForm from "@/components/forms/new-product-form/new-product.form";

const NewProductPage = () => {
  const formProduct = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultProductValues,
  });

  return (
    <>
      <section className="w-full min-h-screen">
        <PageTitle
          title="Додати новий товар"
          description="Сторінка створення товару дозволяє додавати нові продукти до вашого каталогу. Заповніть основну інформацію, додайте зображення, встановіть ціну та налаштуйте категорії для організації товарів."
          isPrevios
          isFormDirty={formProduct.formState.isDirty}
        />
        <div className="p-8">
          <NewProductForm form={formProduct} />
        </div>
      </section>
    </>
  );
};

export default NewProductPage;
