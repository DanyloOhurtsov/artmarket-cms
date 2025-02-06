"use client";

import { useState } from "react";

import PageTitle from "@/components/page-title/page-title";
import ProductForm from "@/components/forms/product.form";

const NewProductPage = () => {
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  return (
    <>
      <section className="w-full min-h-screen">
        <div className="sticky left-0 right-0 top-0 z-20">
          <PageTitle
            title="Додати новий товар"
            description="Сторінка створення товару дозволяє додавати нові продукти до вашого каталогу. Заповніть основну інформацію, додайте зображення, встановіть ціну та налаштуйте категорії для організації товарів."
            isPrevious
            isFormDirty={isFormDirty}
            isSaveCancelSection
            formId="productForm"
          />
        </div>

        <ProductForm setisFormDirty={setIsFormDirty} />
      </section>
    </>
  );
};

export default NewProductPage;
