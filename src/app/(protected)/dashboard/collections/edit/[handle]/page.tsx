"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { fetcher } from "@/lib/functions/fetcher";
import PageTitle from "@/components/page-title/page-title";
import CollectionForm from "@/components/forms/collection.form";
import { CollectionType } from "@/lib/schemas/new/collection.schema";

const CollectionEditPage = () => {
  const params = useParams<{ handle: string }>();
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<CollectionType>();

  const collectionId = params.handle;

  const { data, isLoading, error } = useSWR<CollectionType>(
    `/api/collections/${collectionId}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setInitialData(data);
    }
  }, [data, initialData]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message || "Not found"}</div>;

  return (
    <section className="w-full min-h-screen flex flex-col">
      <PageTitle
        title={"Редагування колекції"}
        isFormDirty={isFormDirty}
        isSaveCancelSection
        formId="collectionForm"
      />

      <div className="p-4">
        <CollectionForm
          initialValues={initialData}
          setIsFormDirty={setIsFormDirty}
          redirectPathAfterCreate="/dashboard/collections"
        />
      </div>
    </section>
  );
};

export default CollectionEditPage;
