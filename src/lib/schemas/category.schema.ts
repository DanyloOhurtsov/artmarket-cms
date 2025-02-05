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

export const categorySchemaTest: z.ZodType = z.lazy(() =>
  z.object({
    id: z.string().default(`cat-${uuid()}`),
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
    description: z.string().max(1000).default(""),
    shortDesc: z.string().max(100).default(""),
    parentId: z.string().nullable().default(null),
    image: z.string().default(""),
    products: z.array(productSchema).default([]),
    children: z.array(z.lazy(() => categorySchemaTest)).default([]),
  })
);
