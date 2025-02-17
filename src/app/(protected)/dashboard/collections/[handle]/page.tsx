"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";

import { fetcher } from "@/lib/functions/fetcher";
import PageTitle from "@/components/page-title/page-title";
import { CollectionType } from "@/lib/schemas/new/collection.schema";
import PageTitleActionButton from "@/components/buttons/page-title-action.button";

import CollectionPageSkeleton from "./_components/collection-page.skelton";
import AsideCollection from "./_components/aside-collection-panel/aside-collection";
import ProductListCollection from "./_components/product-list/product-list-collection";

const CollectionPage = () => {
  const params = useParams<{ handle: string }>();
  const collectionId = params.handle;

  const { data, isLoading, error } = useSWR<CollectionType>(
    `/api/collections/${collectionId}`,
    fetcher
  );

  if (error) return <div>Error: {error?.message || "Not found"}</div>;

  return (
    <section className="w-full min-h-screen flex flex-col relative">
      <div className="sticky left-0 right-0 top-0 z-20">
        <PageTitle title="Сторінка колекції" isPrevious>
          <PageTitleActionButton
            label="Редагувати"
            path={`/dashboard/collections/edit/${collectionId}`}
            variand={"secondary"}
            disabled={isLoading}
          />
        </PageTitle>
      </div>

      {isLoading ? (
        <CollectionPageSkeleton />
      ) : (
        <div className="flex justify-between relative">
          <ProductListCollection data={data} />

          <AsideCollection data={data} />
        </div>
      )}
    </section>
  );
};

export default CollectionPage;
