import { z } from "zod";

// Схема категорій
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
  images: z
    .array(
      z.object({
        url: z.string().default(""),
        alt: z.string().optional().default(""),
      })
    )
    .max(1, "Категорія може мати лише одне зображення")
    .default([]),
  children: z
    .array(z.lazy(() => categorySchema))
    .optional()
    .default([]),
});

// Схема продуктів
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
  description: z.string().max(1000).optional().default(""),
  shortDesc: z.string().max(100).optional().default(""),
  minOrder: z.number().int().positive().optional().default(1),
  maxOrder: z.number().int().positive().optional().nullable().default(null),
  stock: z.number().int().positive().optional().default(0),
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
    .array(
      z.object({
        url: z.string().default(""),
        alt: z.string().optional().default(""),
      })
    )
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

// Дефолтні значення для категорій
export const defaultCategoryValues = {
  id: "",
  name: "",
  slug: "",
  description: "",
  shortDesc: "",
  parentId: null,
  images: [],
  children: [],
};

// Дефолтні значення для товарів
export const defaultProductValues = {
  id: "",
  name: "",
  slug: "",
  description: "",
  shortDesc: "",
  minOrder: 1,
  maxOrder: null,
  stock: 0,
  price: 0,
  isActive: true,
  category: defaultCategoryValues,
  images: [],
  variants: [],
};
