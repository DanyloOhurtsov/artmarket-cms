"use client";

import { z } from "zod";
import useSWR from "swr";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/functions/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import PageTitle from "@/components/page-title/page-title";
import CategoryForm from "@/components/forms/category.form";
import GoBackButton from "@/components/buttons/goback.button";
import { defaultCategoryValues } from "@/lib/schemas/default-values";
import { categorySchema, CategoryType } from "@/lib/schemas/category.schema";

const CategoryEditPage = () => {
  const params = useParams();
  const router = useRouter();

  const categoryId = params?.id;
  const { data, isLoading, error } = useSWR<CategoryType>(
    `/api/categories/${categoryId}`,
    fetcher
  );

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultCategoryValues,
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message || "Not found"}</div>;

  return (
    <section className="w-full min-h-screen relative">
      <div className="sticky top-0 bg-white z-10">
        <PageTitle
          title={`${data.name}`}
          description="Редагування категорії"
          isPrevios
          isFormDirty={form.formState.isDirty}
        >
          <div className="flex gap-x-2">
            <GoBackButton label="Скасувати" />
            <Button>Зберегти</Button>
          </div>
        </PageTitle>
      </div>

      <div className="p-6">
        {/*  */}
        <CategoryForm
          form={form}
          initialData={data}
          onCategorySaved={() =>
            router.push(`/dashboard/categories/${categoryId}`)
          }
        />
      </div>
    </section>
  );
};

export default CategoryEditPage;
