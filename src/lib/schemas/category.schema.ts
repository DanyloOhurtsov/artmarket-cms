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
  image: string;
  products: ProductType[];
};
// Схема категорій

export const categorySchema: z.ZodSchema = z.object({
  id: z.string().default(() => uuid()),
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
  image: z.string().optional().default(""),
  products: z.array(productSchema).default([]),
});
