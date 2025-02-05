"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";

import { fetcher } from "@/lib/functions/fetcher";
import PageTitle from "@/components/page-title/page-title";
import { CollectionType } from "@/lib/schemas/new/collection.schema";
import PageTitleActionButton from "@/components/buttons/page-title-action.button";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import toast from "react-hot-toast";

const CollectionPage = () => {
  const params = useParams<{ id: string }>();
  const collectionId = params.id;

  const { data, isLoading, error } = useSWR<CollectionType>(
    `/api/collections/${collectionId}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message || "Not found"}</div>;

  const handleCopy = (copyText: string) => {
    navigator.clipboard.writeText(copyText);
    toast.success("Скопійовано");
  };

  return (
    <section>
      <PageTitle title={data.title} isPrevios>
        <PageTitleActionButton
          label="Редагувати"
          path={`/dashboard/collections/edit/${collectionId}`}
          variand={"secondary"}
        />
      </PageTitle>

      <div className="p-4">
        <div className="flex w-full bg-green-50 gap-x-2 flex-col sm:flex-row sm:gap-y-2">
          <div className="sm:w-1/2 w-full bg-yellow-50 relative aspect-square">
            {data.image && data.image.url ? (
              <Image
                src={data?.image?.url}
                alt={data.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="sm:w-1/2 w-full bg-gray-200 aspect-square">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-col sm:w-1/2 w-full bg-red-50">
            <div className="flex flex-col">
              <div className="flex justify-between w-full">
                <p className="text-xl font-bold">{data.title}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  onClick={() => handleCopy(data.handle)}
                >
                  <CopyIcon size={24} />
                </Button>
              </div>
              <p className="text-sm font-light from-gray-50">{data.handle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionPage;
