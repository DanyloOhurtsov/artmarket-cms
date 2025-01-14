import { z } from "zod";
import { v4 as uuid } from "uuid";

import { defaultProductValues } from "./default-values";
import { categorySchemaTest, CategoryType } from "./category.schema";

// Product Type
export type ProductType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  minOrder: number;
  maxOrder: number | null;
  stock: number;
  price: number;
  isActive: boolean;
  category: CategoryType;
  images: string[];
  variants: ProductVariantType[];
};

export type ProductVariantType = {
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
};

// Схема товарів
export const productSchema = z.object({
  id: z.string().default(`prod-${uuid()}`),
  name: z
    .string()
    .min(3, { message: "Назва товару повинна містити мінімум 3 символи" })
    .max(100, { message: "Назва товару повинна містити максимум 100 символів" })
    .default(""),
  slug: z
    .string()
    .min(3, { message: "Slug товару повинен містити мінімум 3 символи" })
    .max(120, { message: "Slug товару повинен містити максимум 120 символів" })
    .default(""),
  description: z.string().max(3000).optional().default(""),
  shortDesc: z.string().max(250).optional().default(""),
  minOrder: z.number().int().positive().optional().default(1),
  maxOrder: z.number().int().positive().optional().nullable().default(null),
  stock: z.number().int().positive().optional().default(1),
  price: z.number().positive().default(0),
  isActive: z.boolean().default(true),
  category: z
    .lazy(() => categorySchemaTest)
    .default(defaultProductValues.category),
  images: z
    .array(z.string())
    .min(1, "Додайте хоча б одне зображення")
    .max(10, "Не більше 10 зображень")
    .default([]),
  variants: z
    .array(
      z.object({
        name: z
          .string()
          .min(3, {
            message: "Назва варіанта повинна містити мінімум 3 символи",
          })
          .max(100, {
            message: "Назва варіанта повинна містити максимум 100 символів",
          })
          .default(""),
        slug: z
          .string()
          .min(3, {
            message: "Slug варіанта повинен містити мінімум 3 символи",
          })
          .max(120, {
            message: "Slug варіанта повинен містити максимум 120 символів",
          })
          .default(""),
        description: z.string().max(1000).optional().default(""),
        shortDesc: z.string().max(100).optional().default(""),
      })
    )
    .optional()
    .default([]),
});
