import Image from "next/image";
import { BoxIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import CopyButton from "@/components/buttons/copy.button";
import { CollectionType } from "@/lib/schemas/new/collection.schema";
import AsideCollectionSkeleton from "./aside-collection.skeleton";

interface AsideCollectionProps {
  data: CollectionType | undefined;
}

const AsideCollection = ({ data }: AsideCollectionProps) => {
  if (!data) return <AsideCollectionSkeleton />;

  return (
    <>
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
            <p className="text-sm font-light">
              {data.description ? <>{data.description}</> : <>Не вказано</>}
            </p>
          </div>

          <Separator />

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
                  <div className="w-1/3 min-w-5 border-r border-gray-200 pl-1 font-medium text-sm">
                    {item.label}
                  </div>
                  <div className="w-2/3 pl-1 font-light text-sm">
                    {item.value ? (
                      <CopyButton title={item.value} type="secondary" />
                    ) : (
                      <p>Не вказано</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-semibold">Продукти</h2>
            <div className="w-full flex flex-col">
              {[
                { label: "Кількість", value: data.products?.length ?? 0 },
                {
                  label: "Активні",
                  value:
                    data.products?.filter((product) => product.availableForSale)
                      .length ?? 0,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`w-full flex ${
                    index !== 0 ? "border-t border-gray-200" : ""
                  }`}
                >
                  <div className="w-1/3 min-w-5 border-r border-gray-200 pl-1 font-medium text-sm">
                    {item.label}
                  </div>
                  <div className="w-2/3 pl-1 font-light text-sm">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideCollection;
