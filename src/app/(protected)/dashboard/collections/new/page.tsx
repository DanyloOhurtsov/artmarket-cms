"use client";

import { useState } from "react";

import PageTitle from "@/components/page-title/page-title";
import CollectionForm from "@/components/forms/collection.form";

const NewCollectionPage = () => {
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  return (
    <section className="">
      <PageTitle
        title="Створити категорію"
        description="Сторінка створення категорій дозволяє додавати нові категорії для впорядкування товарів. Вкажіть назву, опис та за потреби додайте зображення для зручної навігації."
        isPrevios
        isSaveCancelSection
        isFormDirty={isFormDirty}
        formId="collectionForm"
      />

      <CollectionForm
        redirectPathAfterCreate="/dashboard/collections"
        setIsFormDirty={setIsFormDirty}
      />
    </section>
  );
};

export default NewCollectionPage;
