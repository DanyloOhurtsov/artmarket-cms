import { z } from "zod";
import { v4 as uuid } from "uuid";
import { productSchema, ProductType } from "./product.schema";
import { variantSchema, VariantType } from "./variant.schema";
import { collectionSchema, CollectionType } from "./collection.schema";

export type SeoType = {
  id: string;
  title: string;
  description?: string;

  product?: ProductType;
  collection?: CollectionType;
  variant?: VariantType;
};

export const seoSchema: z.ZodType<SeoType> = z.object({
  id: z.string() || `seo-${uuid()}`,
  title: z.string().min(3).max(200),
  description: z.string().max(2000).default(""),

  product: z.lazy(() => productSchema).optional(),
  collection: z.lazy(() => collectionSchema).optional(),
  variant: z.lazy(() => variantSchema).optional(),
});
