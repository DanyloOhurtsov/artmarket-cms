import { z } from "zod";
import {
  categorySchema,
  CategoryType,
  defaultCategoryValues,
} from "./category.schema";

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
  id: z.string().default(""),
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
  category: categorySchema.default({
    id: "",
    name: "",
    slug: "",
    description: "",
    shortDesc: "",
    parentId: null,
    images: [],
    children: [],
  }),
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

// Дефолтні значення для товарів
export const defaultProductValues = {
  name: "",
  slug: "",
  description: "",
  shortDesc: "",
  minOrder: 1,
  maxOrder: 100,
  stock: 1,
  price: 0,
  isActive: true,
  category: defaultCategoryValues,
  images: [],
  variants: [],
};
