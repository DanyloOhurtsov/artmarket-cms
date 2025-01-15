"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import PageTitle from "@/components/page-title/page-title";
import CategoryForm from "@/components/forms/category.form";
import { categorySchema } from "@/lib/schemas/category.schema";
import { defaultCategoryValues } from "@/lib/schemas/default-values";

const NewCategoryPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
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

      <div className="p-4">
        <CategoryForm onCategorySaved={handleCategoryCreated} form={form} />
      </div>
    </section>
  );
};

export default NewCategoryPage;
