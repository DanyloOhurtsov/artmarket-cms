"use client";

import PageTitle from "@/components/page-title/page-title";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/functions/fetcher";
import { CollectionType } from "@/lib/schemas/new/collection.schema";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

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
    <section>
      <PageTitle title={data.title} isPrevios>
        <Button variant={"secondary"}>
          <Link href={`/dashboard/collections/edit/${collectionId}`}>
            Редагувати
          </Link>
        </Button>
      </PageTitle>

      
    </section>
  );
};

export default CollectionPage;
