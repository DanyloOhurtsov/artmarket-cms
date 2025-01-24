import { z } from "zod";
import { v4 as uuid } from "uuid";
import { orderSchema, OrderType } from "./order.schema";
import { productSchema, ProductType } from "../product.schema";
import { variantSchema, VariantType } from "../variant.schema";

export type OrderItemType = {
  id: string;
  quantity: number;
  price: number;

  orderId: string;
  order: OrderType;

  productId: string;
  product: ProductType;

  selectedVariantId: string;
  selectedVariant: VariantType;
};

export const orderItemSchema: z.ZodType<OrderItemType> = z.object({
  id: z.string() || `orderItem-${uuid()}`,
  quantity: z.number(),
  price: z.number(),

  orderId: z.string(),
  order: z.lazy(() => orderSchema),

  productId: z.string(),
  product: z.lazy(() => productSchema),

  selectedVariantId: z.string(),
  selectedVariant: z.lazy(() => variantSchema),
});
