"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";

import { fetcher } from "@/lib/functions/fetcher";
import LinkButton from "@/components/buttons/link.button";
import PageTitle from "@/components/page-title/page-title";
import { CategoryType } from "@/lib/schemas/category.schema";

const CategoryPage = () => {
  const params = useParams();

  const categoryId = params?.id;
  const { data, isLoading, error } = useSWR<CategoryType>(
    `/api/categories/${categoryId}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error || "Not found"}</div>;

  return (
    <section className="w-full min-h-screen flex flex-col">
      <PageTitle title={`${data.name}`} isPrevios>
        <LinkButton
          label="Редагувати"
          href={`/dashboard/categories/edit/${categoryId}`}
          variant={"secondary"}
        />
      </PageTitle>

      <div>
        <p>Назва: {data.name}</p>
        <p>Опис: {data.description}</p>
      </div>
    </section>
  );
};

export default CategoryPage;
