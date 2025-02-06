"use client";

import { useState } from "react";

import PageTitle from "@/components/page-title/page-title";
import ProductForm from "@/components/forms/product.form";

const NewProductPage = () => {
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  return (
    <>
      <section className="w-full min-h-screen">
        <PageTitle
          title="Додати новий товар"
          description="Сторінка створення товару дозволяє додавати нові продукти до вашого каталогу. Заповніть основну інформацію, додайте зображення, встановіть ціну та налаштуйте категорії для організації товарів."
          isPrevios
          isFormDirty={isFormDirty}
          isSaveCancelSection
          formId="productForm"
        />

        <div className="p-4">
          <ProductForm setisFormDirty={setIsFormDirty} />
        </div>
      </section>
    </>
  );
};

export default NewProductPage;
