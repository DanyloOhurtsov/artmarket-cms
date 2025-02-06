"use client";

import useSWR from "swr";
import Image from "next/image";
import { BoxIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { fetcher } from "@/lib/functions/fetcher";
import CopyButton from "@/components/buttons/copy.button";
import PageTitle from "@/components/page-title/page-title";
import { CollectionType } from "@/lib/schemas/new/collection.schema";
import ProductList from "@/components/lists/product-list/product-list";
import PageTitleActionButton from "@/components/buttons/page-title-action.button";

const CollectionPage = () => {
  const params = useParams<{ id: string }>();
  const collectionId = params.id;

  const { data, isLoading, error } = useSWR<CollectionType>(
    `/api/collections/${collectionId}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message || "Not found"}</div>;

  return (
    <section className="w-full min-h-screen flex flex-col relative">
      <div className="sticky left-0 right-0 top-0 z-20">
        <PageTitle title="Сторінка колекції" isPrevious>
          <PageTitleActionButton
            label="Редагувати"
            path={`/dashboard/collections/edit/${collectionId}`}
            variand={"secondary"}
          />
        </PageTitle>
      </div>

      <div className="flex justify-between relative">
        <div className="w-3/4 h-[2000px] p-4 bg-red-50">
          {data.products && data.products.length > 0 ? (
            <ProductList products={data.products} />
          ) : (
            "Товарів не знайдено"
          )}
        </div>

        <div className="w-1/4 p-4 sm:sticky sm:right-0 sm:top-20 h-[calc(100vh-5rem)]">
          <div className="p-4 border rounded-lg h-full flex flex-col gap-y-4">
            <div className="flex w-full gap-x-2">
              <div className="relative aspect-square w-1/4 rounded-md overflow-hidden">
                {data.image && data.image.url ? (
                  <Image
                    src={data?.image?.url}
                    alt={data.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="size-full bg-gray-200 flex items-center justify-center">
                    <BoxIcon size={48} className="opacity-30" />
                  </div>
                )}
              </div>

              <div className="flex flex-col w-3/4 items-start">
                <CopyButton title={data.title} />
                <CopyButton title={data.handle} type="secondary" />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <h2 className="text-lg font-semibold">Опис</h2>
              <p>{data.description}</p>
            </div>

            <div className="flex flex-col gap-y-2">
              <h2 className="text-lg font-semibold">Мета дані</h2>
              <div className="w-full flex flex-col">
                {[
                  { label: "Назва", value: data.seo?.title },
                  { label: "Опис", value: data.seo?.description },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`w-full flex ${
                      index !== 0 ? "border-t border-gray-200" : ""
                    }`}
                  >
                    <div className="w-1/3 min-w-5 border-r border-gray-200 pl-1 font-medium">
                      {item.label}
                    </div>
                    <div className="w-2/3 pl-1 font-light">
                      {item.value ? (
                        <CopyButton title={item.value} type="secondary" />
                      ) : (
                        "Не вказано"
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <h2 className="text-lg font-semibold">Продукти</h2>
              <div className="w-full flex flex-col">
                {[
                  { label: "Кількість", value: data.products?.length ?? 0 },
                  {
                    label: "Активні",
                    value:
                      data.products?.filter(
                        (product) => product.availableForSale
                      ).length ?? 0,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`w-full flex ${
                      index !== 0 ? "border-t border-gray-200" : ""
                    }`}
                  >
                    <div className="w-1/3 min-w-5 border-r border-gray-200 pl-1 font-medium">
                      {item.label}
                    </div>
                    <div className="w-2/3 pl-1 font-light">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionPage;
