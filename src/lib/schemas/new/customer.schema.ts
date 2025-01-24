import z from "zod";
import { v4 as uuid } from "uuid";
import { orderSchema, OrderType } from "./order/order.schema";

export type CustomerType = {
  id: string;
  firstName: string;
  lastName: string;
  patronymic?: string;

  email: string;
  phone: string;

  orders: OrderType[];
};

export const customerSchema: z.ZodType<CustomerType> = z.object({
  id: z.string() || `customer-${uuid()}`,
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().optional(),

  email: z.string(),
  phone: z.string(),

  orders: z.array(z.lazy(() => orderSchema)),
});
