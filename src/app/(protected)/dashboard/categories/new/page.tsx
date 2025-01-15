"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import PageTitle from "@/components/page-title/page-title";
import CategoryForm from "@/components/forms/category.form";
import { categorySchemaTest } from "@/lib/schemas/category.schema";
import { defaultCategoryValues } from "@/lib/schemas/default-values";

const NewCategoryPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof categorySchemaTest>>({
    resolver: zodResolver(categorySchemaTest),
    defaultValues: defaultCategoryValues,
  });

  const handleCategoryCreated = () => {
    router.push("/dashboard/categories");
  };
  return (
    <section>
      <PageTitle
        title="Створити категорію"
        description="Сторінка створення категорій дозволяє додавати нові категорії для впорядкування товарів. Вкажіть назву, опис та за потреби додайте зображення для зручної навігації."
        isPrevios
      />
      <CategoryForm onCategorySaved={handleCategoryCreated} form={form} />
    </section>
  );
};

export default NewCategoryPage;
