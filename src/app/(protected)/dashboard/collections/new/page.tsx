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
        isPrevious
        isSaveCancelSection
        isFormDirty={isFormDirty}
        formId="collectionForm"
      />

      <div className="p-4">
        <CollectionForm
          redirectPathAfterCreate="/dashboard/collections"
          setIsFormDirty={setIsFormDirty}
        />
      </div>
    </section>
  );
};

export default NewCollectionPage;
