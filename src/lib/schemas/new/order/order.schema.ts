import z from "zod";
import { v4 as uuid } from "uuid";

import { customerSchema, CustomerType } from "../customer.schema";
import { orderItemSchema, OrderItemType } from "./order-item.schema";

export type OrderType = {
  id: string;
  status: string;
  paymentMethod: string;
  shippingAddress: string;
  totalAmount: number;

  customerId: string;
  customer: CustomerType;

  items: OrderItemType[];

  createdAt: Date;
  updatedAt: Date;
};

export const orderSchema: z.ZodType<OrderType> = z.object({
  id: z.string() || `order-${uuid()}`,
  status: z.string(),
  paymentMethod: z.string(),
  shippingAddress: z.string(),
  totalAmount: z.number(),

  customerId: z.string(),
  customer: z.lazy(() => customerSchema),

  items: z.array(z.lazy(() => orderItemSchema)),

  createdAt: z.date(),
  updatedAt: z.date(),
});
