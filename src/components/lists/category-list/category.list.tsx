"use client";

import useSWR from "swr";
import React from "react";

import { fetcher } from "@/lib/functions/fetcher";
import CategoryItem from "./components/category-item";
import { CategoryType } from "@/lib/schemas/category.schema";

const CategoryList = () => {
  const { data, error, isLoading } = useSWR<CategoryType[]>(
    "/api/categories",
    fetcher
  );

  if (isLoading) return <p>Loading categories...</p>;
  if (!data || error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="flex justify-between items-center">Фільтри</div>

      <ul className="flex flex-col space-y-2">
        {data.map((category, index) => (
          <li key={`category-${index}`}>
            <CategoryItem category={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
