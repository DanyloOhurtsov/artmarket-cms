import { z } from "zod";
import { v4 as uuid } from "uuid"; 
import { productSchema, ProductType } from "./product.schema";

// Category Type
export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  parentId: string | null;
  image: string;
  children: CategoryType[];
  products: ProductType[];
};
// Схема категорій

export const categorySchemaTest = (depth = 0): z.ZodType =>
  z.lazy(() =>
    z.object({
      id: z.string().default(() => uuid()),
      name: z
        .string()
        .min(3, {
          message: "Назва категорії повинна містити мінімум 3 символи",
        })
        .max(100, {
          message: "Назва категорії повинна містити максимум 100 символів",
        })
        .default(""),
      slug: z
        .string()
        .min(3, { message: "Slug категорії повинен містити мінімум 3 символи" })
        .max(120, {
          message: "Slug категорії повинен містити максимум 120 символів",
        })
        .default(""),
      description: z.string().max(1000).optional().default(""),
      shortDesc: z.string().max(100).optional().default(""),
      parentId: z.string().nullable().default(null),
      image: z.string().optional().default(""),
      products: z.array(productSchema).default([]),
      children:
        depth < 3
          ? z.array(categorySchemaTest(depth + 1)).default([])
          : z.array(z.never()),
    })
  );

export const limitCategoryDepth = categorySchemaTest();

export const categorySchema: z.ZodType = z.object({
  id: z.string().default(""),
  name: z
    .string()
    .min(3, { message: "Назва категорії повинна містити мінімум 3 символи" })
    .max(100, {
      message: "Назва категорії повинна містити максимум 100 символів",
    })
    .default(""),
  slug: z
    .string()
    .min(3, { message: "Slug категорії повинен містити мінімум 3 символи" })
    .max(120, {
      message: "Slug категорії повинен містити максимум 120 символів",
    })
    .default(""),
  description: z.string().max(1000).optional().default(""),
  shortDesc: z.string().max(100).optional().default(""),
  parentId: z.string().nullable().default(null),
  image: z.string().optional().default(""),
  children: z.lazy(() => z.array(categorySchema)).default([]),
});

// export type CategoryType = z.infer<typeof categorySchema>;

// Дефолтні значення для категорій
export const defaultCategoryValues = {
  name: "",
  slug: "",
  shortDesc: "",
  description: "",
  parentId: null,
  image: "",
  children: [],
};
