"use client";

import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/functions/fetcher";
import PageTitle from "@/components/page-title";
import { CategoryType } from "@/lib/schemas/category.schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CategoryPage = () => {
  const params = useParams();
  const categoryId = params?.id;

  const { data, isLoading, error } = useSWR<CategoryType>(
    `/api/categories/${categoryId}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error.message || "Not found"}</div>;

  console.log(data);

  return (
    <div>
      <PageTitle title={`${data.name}`}>
        <Button variant={"secondary"}>
          <Link href={`/dashboard/categories/edit/${categoryId}`}>
            Редагувати
          </Link>
        </Button>
      </PageTitle>
    </div>
  );
};

export default CategoryPage;
