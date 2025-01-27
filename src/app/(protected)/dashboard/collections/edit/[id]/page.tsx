"use client";

import CollectionForm from "@/components/forms/collection.form";
import PageTitle from "@/components/page-title/page-title";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/functions/fetcher";
import { CollectionType } from "@/lib/schemas/new/collection.schema";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const CollectionEditPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<CollectionType>();

  const collectionId = params.id;

  const { data, isLoading, error } = useSWR<CollectionType>(
    `/api/collections/${collectionId}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setInitialData(data);
    }
  }, [data, initialData]);

  useEffect(() => {
    console.log("isFormDirty", isFormDirty);
  }, [isFormDirty]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message || "Not found"}</div>;

  return (
    <section className="w-full min-h-screen flex flex-col">
      <PageTitle
        title={"Редагування колекції"}
        isPrevios
        isFormDirty={isFormDirty}
      >
        <div className="flex gap-x-2">
          <Button variant="secondary" onClick={() => router.back()}>
            Скинути
          </Button>
          <Button>Зберегти</Button>
        </div>
      </PageTitle>

      <div className="p-2">
        <CollectionForm
          initialValues={initialData}
          setIsFormDirty={setIsFormDirty}
        />
      </div>
    </section>
  );
};

export default CollectionEditPage;
