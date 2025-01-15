import { z } from "zod";
import { v4 as uuid } from "uuid";

export type MenuItemType = {
  id: string;
  name: string;
  order: number;
  parentId: string | null;
  categoryId: string | null;
  children: MenuItemType[];
};

export const menuItemSchema: z.ZodSchema = z.lazy(() =>
  z.object({
    id: z.string().default(() => uuid()),
    name: z
      .string()
      .min(3, {
        message: "Назва пункту меню повинна містити мінімум 3 символи",
      })
      .max(100, {
        message: "Назва пункту меню повинна містити максимум 100 символів",
      })
      .default(""),
    order: z.number().min(1).default(1),
    parentId: z.string().nullable().default(null),
    categoryId: z.string().nullable().default(null),
    children: z.array(z.lazy(() => menuItemSchema)).default([]),
  })
);
