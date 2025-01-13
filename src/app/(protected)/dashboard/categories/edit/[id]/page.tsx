"use client";

import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";

import PageTitle from "@/components/page-title";
import { fetcher } from "@/lib/functions/fetcher";
import { CategoryType } from "@/lib/schemas/category.schema";
import { Button } from "@/components/ui/button";

const CategoryEditPage = () => {
  const params = useParams();
  const router = useRouter();

  const categoryId = params?.id;
  const { data, isLoading, error } = useSWR<CategoryType>(
    `/api/categories/${categoryId}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error.message || "Not found"}</div>;

  return (
    <section>
      <PageTitle title={`${data.name}`} description="Редагування категорії">
        <div className="flex gap-x-2">
          <Button variant="secondary" onClick={() => router.back()}>
            Скинути
          </Button>
          <Button>Зберегти</Button>
        </div>
      </PageTitle>
    </section>
  );
};

export default CategoryEditPage;
