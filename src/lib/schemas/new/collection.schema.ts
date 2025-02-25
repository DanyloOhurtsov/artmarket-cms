import z from "zod";

import { seoSchema, SeoType } from "./seo.schema";
import { imageSchema, ImageType } from "./image.schema";
import { productSchema, ProductType } from "./product.schema";
import { menuItemSchema, MenuItemType } from "./menu/menu-item.schema";

export type CollectionType = {
  id: string;
  title: string;
  handle: string;

  description?: string;

  imageId?: string;
  image?: ImageType;

  seoId?: string | null;
  seo?: SeoType;

  products?: ProductType[];

  menuItems?: MenuItemType[];
};

export const collectionSchema: z.ZodType<CollectionType> = z.object({
  id: z.string(),
  title: z.string().min(3).max(200),
  handle: z.string().min(3).max(250),

  description: z.string().max(2000).default(""),

  imageId: z.string().optional(),
  image: z.lazy(() => imageSchema.optional()),

  seoId: z.string().optional().nullable(),
  seo: z.lazy(() => seoSchema.optional()),

  products: z.array(z.lazy(() => productSchema)).default([]),

  menuItems: z.array(z.lazy(() => menuItemSchema)).default([]),
});
