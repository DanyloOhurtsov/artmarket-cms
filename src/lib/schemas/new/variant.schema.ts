import z from "zod";
import { v4 as uuid } from "uuid";

import { imageSchema, ImageType } from "./image.schema";
import { productSchema, ProductType } from "./product.schema";
import { orderItemSchema, OrderItemType } from "./order/order-item.schema";
import { quantityRuleSchema, QuantityRuleType } from "./quantity-rule.schema";

export type VariantType = {
  id: string;
  title: string;

  weight?: string;
  price: number;

  availableForSale?: boolean;
  quantityAvailable?: number;

  imageId?: string;
  image?: ImageType;

  productId?: string;
  product?: ProductType;

  quantityRuleId?: string;
  quantityRule?: QuantityRuleType;

  orderItem?: OrderItemType;
};

export const variantSchema: z.ZodType<VariantType> = z.object({
  id: z.string() || `variant-${uuid()}`,
  title: z.string().min(3).max(200),

  weight: z.string().optional(),
  price: z.number(),

  availableForSale: z.boolean().default(true),
  quantityAvailable: z.number().default(0),

  imageId: z.string().optional(),
  image: z.lazy(() => imageSchema).optional(),

  productId: z.string().optional(),
  product: z.lazy(() => productSchema).optional(),

  quantityRuleId: z.string().optional(),
  quantityRule: z.lazy(() => quantityRuleSchema).optional(),

  orderItem: z.lazy(() => orderItemSchema).optional(),
});
