import z from "zod";
import { v4 as uuid } from "uuid";
import { productSchema, ProductType } from "./product.schema";
import { variantSchema, VariantType } from "./variant.schema";
import { collectionSchema, CollectionType } from "./collection.schema";

export type ImageType = {
  id: string;
  url: string;

  productId: string | null;
  product?: ProductType | null;
  featuredInProduct?: ProductType;

  collection?: CollectionType | null;

  variant?: VariantType | null;
};

export const imageSchema: z.ZodType<ImageType> = z.object({
  id: z.string() || `image-${uuid()}`,
  url: z.string(),

  productId: z.string().nullable(),
  product: z
    .lazy(() => productSchema)
    .optional()
    .nullable(),
  featuredInProduct: z.lazy(() => productSchema).optional(),

  collection: z
    .lazy(() => collectionSchema)
    .optional()
    .nullable(),
  variant: z
    .lazy(() => variantSchema)
    .optional()
    .nullable(),
});
