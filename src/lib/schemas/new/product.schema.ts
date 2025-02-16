import { z } from "zod";

import { seoSchema, SeoType } from "./seo.schema";
import { imageSchema, ImageType } from "./image.schema";
import { variantSchema, VariantType } from "./variant.schema";
import { collectionSchema, CollectionType } from "./collection.schema";

export type ProductType = {
  id: string;
  title: string;
  handle: string;
  vendor: string;

  description?: string;
  shortDescription?: string;

  availableForSale?: boolean;
  totalInventory?: number;

  minPrice: number;
  maxPrice: number;

  featuredImageId?: string;
  featuredImage?: ImageType;
  images?: ImageType[];

  variants?: VariantType[];

  seoId?: string;
  seo?: SeoType;

  collections?: CollectionType[];

  createdAt?: Date;
  updatedAt?: Date;
};

export const productSchema: z.ZodType<ProductType> = z
  .object({
    id: z.string(),
    title: z.string().min(3).max(200),
    handle: z.string().min(3).max(250),
    vendor: z.string().min(3).max(200),

    description: z.string().max(2000).default(""),
    shortDescription: z.string().max(500).default(""),

    availableForSale: z.boolean().default(true),
    totalInventory: z.number().default(0),

    minPrice: z.number(),
    maxPrice: z.number(),

    featuredImageId: z.string().optional(),
    featuredImage: z.lazy(() => imageSchema).optional(),
    images: z.array(z.lazy(() => imageSchema)).optional(),

    variants: z.array(z.lazy(() => variantSchema)).default([]),

    seoId: z.string().optional(),
    seo: z.lazy(() => seoSchema).optional(),

    collections: z.array(z.lazy(() => collectionSchema)).optional(),
  })
  
