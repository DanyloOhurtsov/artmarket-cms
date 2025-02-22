import { Skeleton } from "@/components/ui/skeleton";
import ProductListCollectionSkeleton from "./product-list/product-list-collection.skeleton";
import { Separator } from "@/components/ui/separator";

const CollectionPageSkeleton = () => {
  return (
    <div className="flex justify-between relative">
      <div className="w-3/4 p-4">
        <ProductListCollectionSkeleton />
      </div>

      <div className="w-1/4 p-4 h-[calc(100vh-5rem)]">
        <div className="p-4 border rounded-lg h-full flex flex-col gap-y-4">
          <div className="flex w-full gap-x-2">
            <div className="aspect-square w-1/4 rounded-md overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>

            <div className="flex flex-col w-3/4 items-start">
              <div className="flex justify-between px-2 py-1 gap-x-2 w-full">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-6 h-4" />
              </div>
              <div className="flex justify-between px-2 py-1 gap-x-2 w-full">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-6 h-4" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-semibold">Опис</h2>
            <Skeleton className="w-full h-4" />
          </div>

          <Separator />

          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-semibold">Мета дані</h2>
            <div className="w-full flex flex-col gap-y-1">
              <div className="w-full flex border-t border-gray-200 gap-x-1">
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-2/3 h-4" />
              </div>
              <div className="w-full flex border-t border-gray-200 gap-x-1">
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-2/3 h-4" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-semibold">Продукти</h2>
            <div className="w-full flex flex-col gap-y-1">
              <div className="w-full flex border-t border-gray-200 gap-x-1">
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-2/3 h-4" />
              </div>
              <div className="w-full flex border-t border-gray-200 gap-x-1">
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-2/3 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPageSkeleton;
